# GitHub Profile Viewer

간단한 GitHub 사용자 저장소 조회 웹 서비스입니다.

- 접속 URL: [ghpv.selosele.com](https://ghpv.selosele.com)

## 기술 스택 및 개발 환경

- `React`
- `TypeScript`
- `Vite`
- `macOS`

## 기능

- GitHub 사용자 공개 저장소 조회
- 저장소 검색 및 필터링 (Forked, Archived 포함/제외)
- 정렬 옵션: Pushed / Updated / Created
- Vercel Edge Function을 통한 GitHub API 요청 프록시

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (운영체제별 npm 스크립트 선택)
npm run dev (macOS)
npm run dev:wsl (Windows + WSL)
npm run dev:window (Windows Only)

# 빌드
npm run build
```
