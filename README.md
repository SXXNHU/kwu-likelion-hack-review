# ANIMAL LEAGUE 회고 세션

멋쟁이사자처럼 대학 14기 중앙해커톤 회고 세션용 웹사이트.
팀원들이 세션 전 미리 답변을 남기고, 세션 당일 블랙보드 화면에서 팀별 포스트잇으로 함께 확인합니다.

## 페이지 구성

- `/` — 온보딩. "시작하기" → 블랙보드(`/board/1`)로 이동, "추가하기" → 답변 작성(`/write`)
- `/write` — 4개 질문 카드 → 클릭 시 모달에서 팀 선택 + 답변 작성 후 저장
- `/board/[1-4]` — 질문별 블랙보드. 저장된 답변이 팀 색상의 포스트잇으로 무작위 분포. 우측 하단 "다음 질문"으로 이동, 4번 다음은 처음으로

## 로컬 실행 준비

### 1. Firebase 프로젝트 생성

1. https://console.firebase.google.com 에서 새 프로젝트 생성
2. Firestore Database 생성 (Native mode, 아무 리전)
3. 프로젝트 설정 → 서비스 계정 → "새 비공개 키 생성"으로 JSON 다운로드
4. JSON의 `project_id`, `client_email`, `private_key` 값을 아래처럼 `.env.local`에 채워넣기

```bash
cp .env.local.example .env.local
```

`.env.local`:

```
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

`FIREBASE_PRIVATE_KEY`는 JSON에 있는 값 그대로 따옴표로 감싸서 붙여넣으면 됩니다 (`\n` 포함).

### 2. 설치 및 실행

```bash
npm install
npm run dev
```

http://localhost:3000 접속

## 배포 (Vercel)

1. GitHub에 push
2. Vercel에서 이 저장소 Import
3. 프로젝트 Settings → Environment Variables에 `.env.local`과 동일한 3개 값 등록
4. Deploy

## 팀 / 질문 수정

- 팀 이름·색상: `lib/teams.js`
- 질문 문구: `lib/questions.js`
