# AFTER HACK — 중앙해커톤 회고

멋쟁이사자처럼 대학 14기 중앙해커톤 회고 세션용 웹사이트. 팀원들이 세션 전 미리 답변을 남기고,
세션 당일 칠판 화면에서 팀 색상의 포스트잇으로 함께 확인합니다.

디자인은 `AFTER-HACK-design/AFTER-HACK/CLAUDE-HANDOFF.md` + `index.html` 시안을 그대로 이식했습니다
(색상 토큰, 타이포그래피, 칠판/포스트잇 질감, 전환 애니메이션 등). Tailwind 등 유틸리티 프레임워크 없이
`app/globals.css` 하나에 시안 CSS를 그대로 옮겨 썼습니다.

## 페이지 구성

- `/` — 온보딩. "시작하기" → 암전 후 칠판(`/board/1`)으로 이동, "추가하기" → 답변 작성(`/write`)
- `/write` — 4개 질문 카드 → 클릭 시 모달에서 팀 선택 + 답변 작성 후 저장
- `/board/[1-4]` — 질문별 칠판. 저장된 답변이 팀 색상의 포스트잇으로 표시(팀별로 뭉치지 않게 id 기반으로 섞은 뒤 grid에 순서대로 배치). 우측 상단 숫자 또는 우측 하단 "다음 질문"으로 이동, 4번은 "회고 마치기"로 온보딩 복귀

## 배경 이미지

`--onboarding-image`(온보딩), `--session-image`(칠판 페이지 공통)는 `app/globals.css` `:root`에서
`/public/images/onboarding-bg.png`, `/public/images/board-bg.jpg`를 가리킵니다. 다른 이미지로 교체하려면
해당 파일을 바꾸거나 두 변수의 경로를 수정하세요.

## 데이터 저장 방식

별도 DB 없이 **이 GitHub 저장소 자체를 데이터 저장소로 사용**합니다. 답변을 저장하면 서버가 GitHub Contents API로 `data/answers.json`을 갱신(커밋)하고, 조회 시 같은 파일을 읽습니다. Firebase 등 외부 서비스 가입이 필요 없습니다.

### 1. GitHub Personal Access Token 발급

1. https://github.com/settings/personal-access-tokens/new 에서 Fine-grained token 생성
2. Repository access → "Only select repositories" → 이 저장소(`kwu-likelion-hack-review`)만 선택
3. Permissions → Repository permissions → **Contents: Read and write**로 설정
4. 발급된 토큰 복사 (한 번만 표시됨)

```bash
cp .env.local.example .env.local
```

`.env.local`:

```
GH_PAT=발급받은 토큰
GH_OWNER=SXXNHU
GH_REPO=kwu-likelion-hack-review
GH_BRANCH=main
GH_DATA_PATH=data/answers.json
```

### 2. 설치 및 실행

```bash
npm install
npm run dev
```

http://localhost:3000 접속

## 배포 (Vercel)

1. GitHub에 push
2. Vercel에서 이 저장소 Import
3. 프로젝트 Settings → Environment Variables에 `.env.local`과 동일한 5개 값 등록
4. Deploy

답변이 저장될 때마다 저장소에 자동 커밋이 쌓입니다(예: `chore(answers): add answer for question 1`). 기본 설정이면 Vercel이 이 커밋마다 매번 재배포를 시도해 빌드 시간을 소모합니다. Vercel 프로젝트 → Settings → Git → **Ignored Build Step**에 아래 명령을 등록해서 `data/` 변경만 있는 커밋은 재배포를 건너뛰도록 하는 걸 권장합니다:

```bash
git diff --quiet HEAD^ HEAD -- . ':!data'
```

## 팀 / 질문 수정

- 팀 이름·색상: `lib/teams.js`
- 질문 문구: `lib/questions.js` (원문 질문은 변경 금지 대상이므로 문구를 바꿀 때 주의)

## 폰트 라이선스

`public/fonts/body.otf`, `public/fonts/handwriting.ttf`(Gaegu)는 SIL Open Font License로 배포되는
서체입니다. 라이선스 원문은 같은 폴더의 `OFL-Noto.txt`, `OFL-Gaegu.txt` 참고.
