# 프로젝트 구조 및 아키텍처

## 아래 구조는 예시입니다. 아래 패턴을 최대한 참고하여 직관적인 구조로 생성합니다.
## 전체 구조 예시
marketing-automation/
├── apps/
│   ├── web/                    # Next.js Frontend
│   ├── api/                    # NestJS Backend
│   └── ai/                     # FastAPI AI Server
├── packages/
│   ├── shared/                 # 공통 타입, 유틸
│   └── ui/                     # 공통 UI 컴포넌트
└── docker-compose.yml          # 로컬 개발 환경

## Frontend (apps/web) 예시
src/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # 인증 필요 그룹
│   │   ├── dashboard/
│   │   ├── campaigns/
│   │   └── analytics/
│   ├── (public)/               # 인증 불필요 그룹
│   │   ├── login/
│   │   └── landing/
│   ├── api/                    # API Routes
│   └── layout.tsx              # Root Layout
│
├── components/
│   ├── ui/                     # Shadcn UI 컴포넌트
│   ├── features/               # 기능별 컴포넌트
│   │   ├── campaign/
│   │   └── analytics/
│   └── layouts/                # 레이아웃 컴포넌트
│
├── hooks/                      # 커스텀 훅
│   ├── queries/                # TanStack Query 훅
│   └── use-*.ts
│
├── lib/
│   ├── api.ts                  # API 클라이언트
│   ├── utils.ts                # 유틸리티
│   └── constants.ts            # 상수
│
├── services/                   # API 서비스 레이어
│   ├── campaign.service.ts
│   └── user.service.ts
│
├── stores/                     # Zustand 스토어
│   └── ui.store.ts             # UI 상태만
│
└── types/                      # TypeScript 타입
    ├── api.types.ts
    └── models.types.ts

## Backend (apps/api) 예시
src/
├── modules/                    # 기능 모듈
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── dto/
│   ├── campaigns/
│   ├── users/
│   └── analytics/
│
├── common/
│   ├── decorators/             # 커스텀 데코레이터
│   ├── filters/                # 예외 필터
│   ├── guards/                 # 인증/인가 가드
│   ├── interceptors/           # 인터셉터
│   └── pipes/                  # 검증 파이프
│
├── config/                     # 설정
│   ├── database.config.ts
│   └── redis.config.ts
│
├── entities/                   # DB 엔티티
│   ├── user.entity.ts
│   └── campaign.entity.ts
│
└── main.ts                     # 진입점

## AI Server (apps/ai) 예시
app/
├── api/
│   ├── endpoints/              # API 엔드포인트
│   │   ├── generate.py
│   │   └── analyze.py
│   └── dependencies.py         # 의존성 주입
│
├── core/
│   ├── config.py               # 설정
│   └── exceptions.py           # 예외 처리
│
├── services/
│   ├── llm_service.py          # LLM 서비스
│   ├── embedding_service.py    # 임베딩
│   └── vector_store.py         # 벡터 DB
│
├── chains/                     # LangChain
│   ├── campaign_chain.py
│   └── analysis_chain.py
│
├── models/                     # Pydantic 모델
│   ├── request.py
│   └── response.py
│
└── main.py                     # FastAPI 앱
