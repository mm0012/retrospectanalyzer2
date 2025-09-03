# 프로젝트 구조 (Next.js + Cursor)

## 1. 폴더 구조
```
my-retro-app/
├─ app/
│  ├─ page.tsx                 # 회고 입력 화면
│  ├─ report/[id]/page.tsx     # 결과 화면 (탭 UI)
│
├─ components/
│  ├─ TextEditor.tsx
│  ├─ AnalyzeButton.tsx
│  ├─ Tabs.tsx
│  ├─ NarrativeSectionCard.tsx
│  ├─ KpiCard.tsx
│  ├─ TodoList.tsx
│  ├─ InsightBlock.tsx
│  ├─ CoachingBlock.tsx
│  ├─ WeeklyNotes.tsx
│  ├─ LongTermMetrics.tsx
│  ├─ QAList.tsx
│  ├─ QuoteCard.tsx
│  ├─ SupportNote.tsx
│  ├─ OneLiner.tsx
│  ├─ ExportMenu.tsx
│
├─ lib/
│  ├─ analyze.ts               # OpenAI 호출 로직 (서술형 + 분석 체인)
│  ├─ types.ts                 # NarrativePayload, AnalysisPayload 등 TS 타입
│
├─ pages/api/
│  ├─ analyze.ts               # /api/analyze 엔드포인트
│
├─ __fixtures__/               # 테스트 데이터
│  ├─ retro1.txt
│  ├─ retro1.narrative.json
│  ├─ retro1.analysis.json
│
├─ tests/
│  ├─ analyze.test.ts          # Jest 스냅샷 테스트
│
├─ prompts/
│  ├─ narrative.prompt.md      # 서술형 체인 프롬프트
│  ├─ analysis.prompt.md       # 분석 체인 프롬프트
│
├─ .cursorrules                # Cursor 자동화 규칙
├─ package.json
├─ tsconfig.json
```

## 2. 주요 파일 역할
- **app/page.tsx**: 회고 입력 + “분석하기” 버튼 → API 호출 → 결과 페이지로 이동
- **app/report/[id]/page.tsx**: 서술형 / 분석 탭 UI 렌더링
- **lib/analyze.ts**: OpenAI API 두 번 호출 (서술형, 분석) → JSON 파싱
- **types.ts**: 공용 타입 정의
- **components/**: 카드/리스트/탭 등 UI 조각 모듈화
- **pages/api/analyze.ts**: 백엔드 API → analyze.ts 호출 후 JSON 반환
- **__fixtures__/**: 테스트용 원문/출력 JSON
- **tests/**: Jest 테스트 (스냅샷 + 구조 검증)
- **prompts/**: 프롬프트 버전 관리

## 3. 초기 실행 흐름
1. 사용자가 `/`에서 회고글 입력 → 버튼 클릭
2. `/api/analyze`로 raw_text 전달
3. lib/analyze.ts에서 OpenAI 호출 → narrative + analysis JSON 생성
4. DB 저장 후 `/report/[id]`로 이동
5. Tabs 컴포넌트로 두 탭 UI 출력

## 4. 다음 단계
- DB 연동(PostgreSQL) → Prisma or Supabase
- Export 기능 추가 (PDF, Markdown, Notion)
- i18n (ko/en) 대응
