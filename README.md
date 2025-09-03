# 회고 분석기 (Retrospective Analyzer)

AI 기반 회고 분석 도구로, 회고 텍스트를 입력하면 인사이트와 개선점을 분석해드립니다.

## 🚀 주요 기능

- **서술형 분석**: 회고 내용을 섹션별로 분석하고 개선 포인트 제시
- **대시보드**: 삶의 영역별 점수, 인사이트, 응원 멘트 등 종합 분석
- **AI 분석**: OpenAI GPT 모델을 활용한 맞춤형 분석
- **반응형 UI**: 모바일과 데스크톱에서 모두 사용 가능

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT API
- **Database**: Prisma (SQLite)
- **Deployment**: Vercel (권장)

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone [your-repository-url]
cd 회고-분석
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경변수 설정
`.env.local` 파일을 생성하고 OpenAI API 키를 설정하세요:
```bash
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하세요.

## 🔧 사용법

1. **회고 입력**: 메인 페이지에서 회고 내용을 입력
2. **분석 시작**: "분석 시작하기" 버튼 클릭
3. **결과 확인**: 서술형과 대시보드 탭에서 분석 결과 확인

## 📁 프로젝트 구조

```
회고 분석/
├── app/                    # Next.js 앱 라우터
├── components/             # React 컴포넌트
├── lib/                    # 유틸리티 및 API 로직
├── prompts/                # AI 분석 프롬프트
├── prisma/                 # 데이터베이스 스키마
└── docs/                   # 프로젝트 문서
```

## 🌟 특징

- **개인화된 분석**: 입력된 회고 내용에 맞는 맞춤형 분석
- **직관적인 UI**: 사용자 친화적인 인터페이스
- **실시간 분석**: OpenAI API를 통한 빠른 분석 결과
- **반응형 디자인**: 모든 디바이스에서 최적화된 경험

## 📝 라이선스

MIT License

## 🤝 기여하기

버그 리포트나 기능 제안은 이슈로 등록해주세요.
풀 리퀘스트도 환영합니다!

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 통해 연락해주세요.
