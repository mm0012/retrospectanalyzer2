# D.WORKSENCE 개발환경 세팅 가이드 (로컬 + Docker)

본 문서는 `TECH-STACK.md`, `ARCHITECTURE.md`, `PROJECT_SPEC.md`를 기준으로 실제 개발을 시작하기 위한 로컬/컨테이너 환경 세팅 절차를 정리합니다. 최종 목표는 Nginx 게이트웨이(80)를 통해 부트스트랩 페이지(Next.js)가 보이도록 하는 것입니다.

## 1) 사전 준비물
- macOS/Linux/Windows 11
- Node.js 20+ (권장 v22.x)
- pnpm 9.x (Corepack)
- Docker Desktop 최신 (Compose 포함)

설치 확인
```bash
node -v
corepack enable && corepack prepare pnpm@9.7.0 --activate
pnpm -v
docker compose version
```

## 2) 레포지토리 & 워크스페이스
```bash
git clone git@github.com:aiuserzero/trend_report.git
cd trend_report
pnpm install --no-frozen-lockfile
```
구성 요약: `package.json`(turbo), `pnpm-workspace.yaml`, `turbo.json`

## 3) 프론트엔드 부트스트랩 (Next.js 15, React 19)
- Tailwind v4 방식: `apps/web/app/globals.css`에 `@import "tailwindcss";`
- 테스트 페이지: `apps/web/app/page.tsx` (Hello 출력)
- 설정: `apps/web/next.config.js` 최소화(실험 플래그 제거)

로컬 실행
```bash
pnpm -C apps/web dev --port 3000
# http://localhost:3000
```

## 4) 백엔드 스캐폴딩 (NestJS 11)
```bash
pnpm -C apps/api install
pnpm -C apps/api start:dev
# 3006 포트
```

## 5) 환경 변수
```bash
cp .env.example .env
```
- DB/Redis, API URL 등 `.env.example` 참고 및 필요 시 수정
- 기존 운영 테이블 조회는 컨테이너 외부 psql 사용

## 6) Docker Compose (80 프록시)
서비스: postgres, redis, api(3001), web(내부 3000), nginx(80)

기동
```bash
docker compose up -d --build nginx
```
상태 확인
```bash
docker compose ps
```
접속 확인
```bash
curl -sS http://localhost:8090 | head
# 브라우저: http://localhost:8090
```
중지/정리
```bash
docker compose down
# 볼륨까지
docker compose down -v
```
Nginx 라우팅
- `/` → `web:3000`
- `/api/` → `api:3001`

## 7) 이슈 대응
- Docker 데몬 미기동: Docker Desktop 실행 후 재시도
- 포트 충돌(3000): web 외부 포트 미노출(Nginx만 노출)
- Next.js experimental 경고: 실험 플래그 제거로 해소
- TS 타입 경고: Next가 자동 설정 추가(tsconfig 업데이트)

## 8) 권장 워크플로우
```bash
# 로컬 개발
pnpm -C apps/web dev --port 3000
pnpm -C apps/api start:dev

# 통합(프록시 포함)
docker compose up -d --build nginx
open http://localhost:80
```
