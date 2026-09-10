// Uses the target GitHub repo itself as the datastore: answers are read from
// and appended to a JSON file via the GitHub Contents API. No separate
// database/service account needed — only a PAT scoped to this one repo.

function config() {
  const token = process.env.GH_PAT;
  const owner = process.env.GH_OWNER;
  const repo = process.env.GH_REPO;
  const branch = process.env.GH_BRANCH || "main";
  const path = process.env.GH_DATA_PATH || "data/answers.json";

  if (!token || !owner || !repo) {
    throw new Error(
      "GitHub 저장소 환경변수(GH_PAT, GH_OWNER, GH_REPO)가 설정되지 않았습니다. .env.local을 확인하세요."
    );
  }
  return { token, owner, repo, branch, path };
}

function apiUrl({ owner, repo, path }) {
  return `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
}

async function getFile() {
  const cfg = config();
  const res = await fetch(`${apiUrl(cfg)}?ref=${cfg.branch}`, {
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`GitHub 파일 조회 실패 (${res.status})`);
  }

  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf8");
  let answers = [];
  try {
    answers = JSON.parse(content);
  } catch {
    answers = [];
  }
  if (!Array.isArray(answers)) answers = [];

  return { answers, sha: data.sha };
}

async function putFile(answers, sha, message) {
  const cfg = config();
  const content = Buffer.from(JSON.stringify(answers, null, 2), "utf8").toString(
    "base64"
  );

  const res = await fetch(apiUrl(cfg), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      message,
      content,
      sha,
      branch: cfg.branch,
    }),
  });

  if (res.status === 409) {
    const err = new Error("conflict");
    err.conflict = true;
    throw err;
  }
  if (!res.ok) {
    throw new Error(`GitHub 파일 저장 실패 (${res.status})`);
  }
}

export async function listAnswers(questionId) {
  const { answers } = await getFile();
  return answers.filter((a) => a.questionId === questionId);
}

export async function appendAnswer({ questionId, team, text }) {
  const record = {
    id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    questionId,
    team,
    text,
    createdAt: new Date().toISOString(),
  };

  const MAX_RETRIES = 4;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const { answers, sha } = await getFile();
    try {
      await putFile(
        [...answers, record],
        sha,
        `chore(answers): add answer for question ${questionId}`
      );
      return record;
    } catch (err) {
      if (err.conflict && attempt < MAX_RETRIES - 1) continue;
      throw err;
    }
  }
  throw new Error("저장 중 충돌이 반복되어 실패했습니다.");
}
