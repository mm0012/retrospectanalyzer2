# Vercel 배포 문제 해결 가이드

## 🔍 문제 원인
1. **데이터베이스 연결 실패**: Prisma가 Vercel에서 데이터베이스에 연결되지 않음
2. **환경 변수 누락**: `DATABASE_URL` 등 필요한 환경 변수가 설정되지 않음
3. **API 라우트 의존성**: `/api/report/[id]` 엔드포인트가 데이터베이스에 의존

## 🛠️ 해결 방법

### 1. Vercel 환경 변수 설정
Vercel 대시보드에서 다음 환경 변수들을 설정해야 합니다:

```
DATABASE_URL=postgresql://username:password@host:port/database
```

### 2. 데이터베이스 옵션
- **옵션 A**: Vercel Postgres 사용 (권장)
- **옵션 B**: 외부 PostgreSQL 서비스 사용 (Supabase, PlanetScale 등)
- **옵션 C**: 데이터베이스 없이 세션 기반으로만 작동하도록 수정

### 3. 현재 코드의 문제점
- `app/api/report/[id]/route.ts`에서 데이터베이스 연결 실패 시 500 에러 발생
- `app/report/[id]/page.tsx`에서 API 호출 실패 시 fallback이 있지만 제대로 작동하지 않을 수 있음

## 📝 권장 해결책

### 즉시 해결 (데이터베이스 없이)
1. API 라우트에서 데이터베이스 연결 실패 시 적절한 에러 처리
2. 클라이언트에서 세션 스토리지 fallback 강화

### 장기적 해결 (데이터베이스 포함)
1. Vercel Postgres 설정
2. Prisma 마이그레이션 실행
3. 환경 변수 설정
