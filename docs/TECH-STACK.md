# 프로젝트 기술 스택 정의서

## 📊 현재 구현된 기술 스택

### Frontend (포트: 3000)
- ✅ **Next.js 15.4.5** (App Router) + **TypeScript 5.9.2** (strict)
- ✅ **React 19.1.1** Server Components 우선
- ✅ **Tailwind CSS v4.1** (새로운 import 방식, CSS 변수 시스템) + **Shadcn/ui** + Framer Motion
- ✅ **TanStack Query v5** (서버상태) + **Zustand** (UI상태만)
- ✅ **React Hook Form + Zod** (폼/검증)

### Backend API (포트: 3001)
- ✅ **Node.js 20.19.4 LTS** + **NestJS 11.1.5** (모듈 아키텍처)
- ✅ **PostgreSQL 16** (외부 서버: 49.247.41.75:5432)
- ✅ **Redis 7** (외부 서버: 49.247.41.75:6379, DB 5-9 할당)
- ✅ **Prisma ORM 6.13.0** (타입안전 DB, Docker 기반 binaryTargets 설정)
- ✅ **Passport.js** (JWT, Local, Microsoft 전략)
- ✅ **bcryptjs** (비밀번호 해싱)
- ✅ **ioredis** (Redis 클라이언트)
- ✅ **@nestjs/bullmq + bullmq** (작업 큐)
- ✅ **@nestjs/event-emitter** (이벤트 시스템)
- 🔄 Socket.io 4.7+ (실시간) - 대기 중

### AI Stack (포트: 3005)
- 🔄 **Python 3.11+** + **FastAPI 0.110+**
- 🔄 **LangChain 0.3.x** + **LangGraph** (LLM 프레임워크)
- 🔄 **Celery** (비동기 작업 처리)

## AI APIs
* OpenAI: 기본 AI 모델 (gpt-5-2025-08-07)
* Anthropic: 폴백 AI 모델 (claude-sonnet-4-20250514)
* Perplexity: 실시간 검색
* Gemini 임베딩: 임베딩 (gemini-embedding-001)
* ElevenLabs: 음성합성

## 인프라 (iwinv: https://docs.iwinv.kr/ 참조)
* 클라우드 서버: Ubuntu 22.04 LTS
* PostgreSQL/Redis: 자체구축
* 블록 스토리지: 백업/파일
* Docker 기반 배포

### 인프라 및 배포
- ✅ **Docker & Docker Compose** (컨테이너화)
- ✅ **Nginx** (API Gateway, 포트: 80/443)
- ✅ **pnpm 9.7.0** (패키지 관리)
- ✅ **Turborepo 2.3.3** (모노레포 관리)
- ✅ **외부 PostgreSQL/Redis** (iwinv 클라우드)

### 개발 도구
- ✅ **TypeScript 5.9.2** (strict mode)
- ✅ **ESLint + Prettier** (코드 품질)
- ✅ **class-validator + class-transformer** (검증)
- ✅ **@nestjs/swagger** (API 문서)

## 🔧 중요한 설정 사항

### Prisma 설정 (Docker + pnpm 호환)
```prisma
generator client {
  provider = "prisma-client-js"
  binaryTargets = ["native", "linux-musl", "linux-musl-arm64-openssl-3.0.x"]
}
```

### Docker 볼륨 마운트
```yaml
volumes:
  - ./node_modules:/app/node_modules:cached
  - ./apps/api:/app/apps/api:cached
```

### 환경 변수 구성
- ✅ 외부 PostgreSQL/Redis 연결
- ✅ AI API 키 관리
- ✅ JWT 시크릿 관리

## 📋 핵심 개발 원칙
1. **서버 컴포넌트 우선** - 'use client' 최소화
2. **타입 안전성** - any 금지, strict mode 적용
3. **에러 처리** - 모든 async에 try-catch, 한국어 에러 메시지
4. **Docker 기반 개발** - 모든 테스트는 Docker 환경에서 수행
5. **모노레포 구조** - 서비스별 독립적 개발, 공통 라이브러리 공유
6. **이벤트 기반 아키텍처** - 서비스 간 느슨한 결합
7. **AI 연계** - LangChain/LangGraph 필수 사용

## 🚨 알려진 이슈 및 해결책

### Docker + pnpm + Prisma 조합 문제
- **문제**: TypeScript 타입 인식 오류
- **해결**: `binaryTargets` 설정 + 올바른 볼륨 마운트

### enum 타입 사용 시 주의사항
```typescript
// ❌ 잘못된 사용
interface Filters {
  status?: string;
}

// ✅ 올바른 사용
import { TaskStatus } from '@prisma/client';
interface Filters {
  status?: TaskStatus;
}
```
