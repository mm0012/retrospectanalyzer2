"use client";
import { use, useEffect, useMemo, useState } from "react";
import Tabs from "@/components/Tabs";
import { useRouter } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

// 서술형 섹션 카드 컴포넌트
function SectionCard({ title, content, improvements }: { title: string; content: string; improvements: string[] }) {
  // 제목에서 이모지 추출 (첫 번째 이모지만)
  const emoji = title.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u)?.[0] || "📝";
  // 이모지를 제외한 제목 텍스트
  const titleText = title.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, "").trim();

  return (
    <div className="relative rounded-[16px] size-full">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="relative size-full">
        <div className="box-border flex flex-col gap-8 items-start justify-start p-[40px] relative size-full">
          <div className="flex flex-col gap-5 items-start justify-start relative shrink-0 w-full">
            <div className="flex gap-2.5 items-center justify-center relative shrink-0">
              <div className="shrink-0 size-6 flex items-center justify-center text-[18px]">{emoji}</div>
              <div className="font-pretendard font-medium leading-[0] not-italic relative shrink-0 text-[#1e2939] text-[18px] text-nowrap">
                <p className="leading-[28px] whitespace-pre">{titleText}</p>
              </div>
            </div>
            <div className="font-pretendard font-normal leading-[0] min-w-full not-italic relative shrink-0 text-[#364153] text-[16px]">
              <p className="leading-[24px] whitespace-pre-wrap">{content}</p>
            </div>
          </div>
          <div className="bg-slate-50 relative rounded-[16px] shrink-0 w-full">
            <div className="overflow-clip relative size-full">
              <div className="box-border flex flex-col gap-2.5 items-start justify-start p-[20px] relative w-full">
                <div className="flex flex-col gap-3 items-start justify-start relative shrink-0 w-full">
                  <div className="font-pretendard font-semibold leading-[0] not-italic relative shrink-0 text-[#364153] text-[16px] text-nowrap">
                    <p className="leading-[24px] whitespace-pre">개선 포인트</p>
                  </div>
                  <div className="flex flex-col gap-1.5 items-start justify-start relative shrink-0 w-full">
                    {improvements.map((improvement, index) => (
                      <div key={index} className="flex gap-3 items-center justify-start relative shrink-0">
                        <div className="relative shrink-0 size-[5px]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
                            <circle cx="2.5" cy="2.5" fill="var(--fill-0, #314158)" r="2.5" />
                          </svg>
                        </div>
                        <div className="font-pretendard font-normal leading-[0] not-italic relative shrink-0 text-[#364153] text-[16px] text-nowrap">
                          <p className="leading-[24px] whitespace-pre">{improvement}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 대시보드 카드 컴포넌트
function DashboardCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-[16px] size-full ${className}`}>
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="relative size-full">
        <div className="box-border flex flex-col gap-8 items-start justify-start p-[40px] relative size-full">
          {children}
        </div>
      </div>
    </div>
  );
}

// 태그 컴포넌트
function Badge({ children, variant = "content" }: { children: React.ReactNode; variant?: "content" | "emotion" }) {
  const baseClasses = "box-border flex gap-px items-center justify-center px-2.5 py-1.5 relative rounded-[4px] shrink-0";
  const variantClasses = {
    content: "bg-violet-50 text-[#8e51ff]",
    emotion: "bg-rose-50 text-[#ff637e]"
  };
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      <div className="font-pretendard font-medium leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap">
        <p className="leading-[16px] whitespace-pre">{children}</p>
      </div>
    </div>
  );
}

// 섹션 헤더 컴포넌트
function SectionHeader({ emoji, title }: { emoji: string; title: string }) {
  return (
    <div className="flex gap-2.5 items-center justify-center relative shrink-0">
      <div className="shrink-0 size-6 flex items-center justify-center text-[18px]">{emoji}</div>
      <div className="font-pretendard font-medium leading-[0] not-italic relative shrink-0 text-[#1e2939] text-[18px] text-nowrap">
        <p className="leading-[28px] whitespace-pre">{title}</p>
      </div>
    </div>
  );
}

// 서브 섹션 헤더 컴포넌트
function SubSectionHeader({ emoji, title }: { emoji: string; title: string }) {
  return (
    <div className="flex gap-2 items-center justify-center relative shrink-0">
      <div className="shrink-0 size-6 flex items-center justify-center text-[16px]">{emoji}</div>
      <div className="font-pretendard font-medium leading-[0] not-italic relative shrink-0 text-[#1e2939] text-[16px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">{title}</p>
      </div>
    </div>
  );
}

// 원형 점수 컴포넌트 (간단한 구조)
function CircularScore({ title, score, description, emoji }: { title: string; score: number; description: string; emoji: string }) {
  const percentage = (score / 10) * 100;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="basis-0 flex flex-col gap-3 grow items-center justify-start min-h-px min-w-px relative shrink-0">
      <div className="flex gap-2 items-center justify-center relative shrink-0">
        <div className="shrink-0 size-6 flex items-center justify-center text-[16px]">{emoji}</div>
        <div className="font-pretendard font-medium leading-[0] not-italic relative shrink-0 text-[#1e2939] text-[16px] text-nowrap">
          <p className="leading-[24px] whitespace-pre">{title}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 items-center justify-start relative shrink-0 w-full">
        <div className="relative size-[120px] flex items-center justify-center">
          <svg className="size-[100px] transform -rotate-90" viewBox="0 0 100 100">
            {/* 배경 원 */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#F1F5F9"
              strokeWidth="8"
            />
            {/* 진행률 원 */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#1D293D"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          {/* 중앙 텍스트 */}
          <div className="absolute flex items-center justify-center">
            <span className="font-pretendard font-medium text-[#1d293d] text-[20px] leading-[28px]">{score}</span>
            <span className="font-pretendard font-normal text-[#90a1b9] text-[12px] leading-[16px]">/10</span>
          </div>
        </div>
        <div className="font-pretendard font-normal text-[#62748e] text-[14px] text-center leading-[20px]">
          {description}
        </div>
      </div>
    </div>
  );
}

// 리스트 아이템 컴포넌트
function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 items-center justify-start relative shrink-0 w-full">
      <div className="relative shrink-0 size-[5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
          <circle cx="2.5" cy="2.5" fill="var(--fill-0, #314158)" r="2.5" />
        </svg>
      </div>
      <div className="basis-0 font-pretendard font-normal grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#364153] text-[16px]">
        <p className="leading-[24px]">{children}</p>
      </div>
    </div>
  );
}

// 응원 카드 컴포넌트
function EncouragementCard({ title, content, emoji }: { title: string; content: string; emoji: string }) {
  return (
    <div className="bg-slate-50 relative rounded-[16px] shrink-0 w-full">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border flex flex-col gap-3 items-start justify-center px-6 py-8 relative w-full">
          <div className="flex gap-2 items-center justify-start relative shrink-0">
            <div className="shrink-0 size-6 flex items-center justify-center text-[16px]">{emoji}</div>
            <div className="font-pretendard font-medium leading-[0] not-italic relative shrink-0 text-[#1e2939] text-[16px] text-nowrap">
              <p className="leading-[24px] whitespace-pre">{title}</p>
            </div>
          </div>
          <div className="font-pretendard font-normal leading-[0] min-w-full not-italic relative shrink-0 text-[#364153] text-[16px]">
            <p className="leading-[24px] whitespace-pre-wrap">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReportPage({ params }: Props) {
  const { id } = use(params);
  const [payload, setPayload] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFromApi = async () => {
      try {
        const res = await fetch(`/api/report/${id}`);
        if (res.ok) {
          const data = await res.json();
          setPayload(data);
          return;
        }
      } catch {}
      // fallback to session (older flow)
      const raw = sessionStorage.getItem("lastReport");
      if (raw) {
        try {
          const obj = JSON.parse(raw);
          // id가 달라도 세션의 최신 결과를 우선 표시
          if (obj?.data) setPayload(obj.data);
        } catch {}
      }
    };
    fetchFromApi();
  }, [id]);

  const tabs = useMemo(() => [{ id: "narrative", label: "서술형" }, { id: "analysis", label: "대시보드" }], []);

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="bg-white relative w-full min-h-screen">
      {/* Header */}
      <div className="absolute box-border flex gap-10 items-center justify-start left-0 px-[200px] py-2.5 top-0 w-full">
        <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-slate-100 border-solid inset-0 pointer-events-none" />
        <div className="flex gap-1 items-center justify-start relative shrink-0 cursor-pointer" onClick={handleBack}>
          <div className="relative shrink-0 size-5">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="#020618" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="font-pretendard font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-gray-950 text-nowrap">
            <p className="leading-[20px] whitespace-pre">돌아가기</p>
          </div>
        </div>
        <div className="font-pretendard font-medium leading-[0] not-italic relative shrink-0 text-[18px] text-gray-950 text-nowrap">
          <p className="leading-[28px] whitespace-pre">분석 결과</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="absolute flex flex-col gap-10 items-center justify-start top-[100px] w-[800px]" style={{ left: "calc(50% - 400px)" }}>
      {!payload ? (
          <div className="text-gray-700 text-center">
          <div className="mb-3">데이터를 불러오는 중이거나 세션이 만료되었습니다.</div>
          <button
            className="px-3 py-2 text-sm rounded border"
            onClick={() => {
              try {
                const raw = sessionStorage.getItem("lastReport");
                if (raw) {
                  const obj = JSON.parse(raw);
                  if (obj?.id === id) setPayload(obj.data);
                }
              } catch {}
            }}
          >
            세션에서 다시 불러오기
          </button>
        </div>
      ) : (
          <>
            {/* Tab Navigation */}
        <Tabs
          tabs={tabs}
              initial="narrative"
          render={(id) => {
            if (id === "narrative") {
              return (
                    <div className="flex flex-col gap-4 items-start justify-start relative shrink-0 w-full">
                  {payload.narrative.sections.map((s: any, idx: number) => (
                        <div key={idx} className="relative rounded-[16px] shrink-0 w-full">
                          <SectionCard 
                            title={s.title}
                            content={s.body}
                            improvements={s.improvements}
                          />
                        </div>
                  ))}
                  
                  {/* Bottom Margin */}
                  <div className="h-[160px]"></div>
                </div>
              );
            }
                // 대시보드 탭: 첨부해주신 디자인에 맞게 구현
            const a = payload.analysis;
            return (
                  <div className="flex flex-col gap-4 items-start justify-start relative shrink-0 w-full">
                    {/* 핵심 요약 카드 */}
                    <DashboardCard>
                      <div className="flex flex-col gap-6 items-start justify-start relative shrink-0 w-full">
                        <div className="flex flex-col gap-3 items-start justify-start leading-[0] not-italic relative shrink-0 w-full">
                          <div className="font-pretendard font-medium relative shrink-0 text-[#1e2939] text-[24px] text-nowrap">
                            <p className="leading-[32px] whitespace-pre">🎭 {a.summary_card.character}</p>
                          </div>
                          <div className="font-pretendard font-normal min-w-full relative shrink-0 text-[#364153] text-[16px]">
                            <p className="leading-[24px]">{a.summary_card.one_liner}</p>
                          </div>
                        </div>
                        <div className="bg-slate-50 relative rounded-[16px] shrink-0 w-full">
                          <div className="overflow-clip relative size-full">
                            <div className="box-border flex flex-col gap-3 items-start justify-start p-[24px] relative w-full">
                              <div className="bg-slate-200 box-border flex gap-px items-center justify-center px-2.5 py-1.5 relative rounded-[4px] shrink-0">
                                <div className="font-pretendard font-medium leading-[0] not-italic relative shrink-0 text-[#45556c] text-[12px] text-nowrap">
                                  <p className="leading-[16px] whitespace-pre">무의식에 숨겨진 테마</p>
                                </div>
                              </div>
                              <div className="font-pretendard font-normal leading-[0] not-italic relative shrink-0 text-[#364153] text-[16px] text-nowrap">
                                <p className="leading-[24px] whitespace-pre">{a.hidden_theme}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1.5 items-start justify-start relative shrink-0">
                        {a.tags.map((tag: string, idx: number) => (
                          <Badge key={`content-${idx}`} variant="content">{tag}</Badge>
                        ))}
                        {a.emotion_tags.map((tag: string, idx: number) => (
                          <Badge key={`emotion-${idx}`} variant="emotion">{tag}</Badge>
                        ))}
                      </div>
                    </DashboardCard>

                    {/* 삶의 영역 점수 */}
                    <DashboardCard>
                      <SectionHeader emoji="📊" title="삶의 영역 점수" />
                      <div className="flex flex-wrap gap-6 items-start justify-start relative shrink-0 w-full">
                        <CircularScore 
                          title="일/커리어" 
                          emoji="💼"
                          score={a.life_scores.work} 
                          description="기술 학습으로 꾸준한 발전 및 컨텐츠 공유에서 위로와 인사이트"
                        />
                        <CircularScore 
                          title="몸/건강" 
                          emoji="🧘‍♀️"
                          score={a.life_scores.health} 
                          description="헬스 2회, 러닝 1회, 클라이밍 1회로 다양한 운동 시도"
                        />
                        <CircularScore 
                          title="관계" 
                          emoji="👥"
                          score={a.life_scores.relationships} 
                          description="트레바리 모임에서 깊은 대화와 공감 경험"
                        />
                        <CircularScore 
                          title="감정" 
                          emoji="❤️"
                          score={6} 
                          description="자기표현에 대한 새로운 관점과 성장 의지"
                        />
                      </div>
                    </DashboardCard>

                    {/* 개선 포인트와 인사이트 */}
                    {a.todos && a.todos.length > 0 && (
                      <div className="flex gap-5 items-start justify-start relative shrink-0 w-full">
                        <div className="basis-0 grow min-h-px min-w-px relative rounded-[16px] shrink-0">
                          <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[16px]" />
                          <div className="relative size-full">
                            <div className="box-border flex flex-col gap-6 items-start justify-start p-[40px] relative w-full">
                              <SectionHeader emoji="✅" title="개선 포인트" />
                              <div className="flex flex-col gap-1 items-start justify-start relative shrink-0 w-full">
                                {a.todos.slice(0, 4).map((todo: string, idx: number) => (
                                  <ListItem key={idx}>{todo}</ListItem>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {a.insights && a.insights.patterns && a.insights.patterns.length > 0 && (
                          <div className="basis-0 grow min-h-px min-w-px relative rounded-[16px] shrink-0">
                            <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[16px]" />
                            <div className="relative size-full">
                              <div className="box-border flex flex-col gap-6 items-start justify-start p-[40px] relative w-full">
                                <SectionHeader emoji="🧠" title="인사이트" />
                                <div className="flex flex-col gap-1 items-start justify-start relative shrink-0 w-full">
                                  {a.insights.patterns.slice(0, 4).map((insight: string, idx: number) => (
                                    <ListItem key={idx}>{insight}</ListItem>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 나에게 이런 모습이 */}
                    {a.insights && a.insights.patterns && a.insights.patterns.length > 0 && (
                      <DashboardCard>
                        <SectionHeader emoji="🔍" title="나에게 이런 모습이" />
                        <div className="flex flex-col gap-3 items-start justify-start min-w-[348px] relative shrink-0 w-full">
                          <SubSectionHeader emoji="📈" title="숨겨진 패턴" />
                          <div className="flex flex-col gap-1 items-start justify-start relative shrink-0 w-full">
                            {a.insights.patterns.slice(0, 4).map((pattern: string, idx: number) => (
                              <ListItem key={idx}>{pattern}</ListItem>
                            ))}
                          </div>
                        </div>
                        {a.insights.self_explainer && (
                          <div className="flex flex-col gap-3 items-start justify-start min-w-[348px] relative shrink-0 w-full">
                            <SubSectionHeader emoji="🎭" title="나도 몰랐던 나의 모습" />
                            <div className="flex flex-col gap-1 items-start justify-start relative shrink-0 w-full">
                              <ListItem>{a.insights.self_explainer}</ListItem>
                            </div>
                          </div>
                        )}
                      </DashboardCard>
                    )}

                    {/* 주간 발굴 노트 */}
                    {a.weekly_notes && (
                      <DashboardCard>
                        <SectionHeader emoji="⭐" title="주간 발굴 노트" />
                        <div className="flex flex-wrap gap-6 items-start justify-start relative shrink-0 w-full">
                          {a.weekly_notes.moments && a.weekly_notes.moments.length > 0 && (
                            <div className="basis-0 flex flex-col gap-3 grow items-start justify-start min-h-px min-w-[348px] relative shrink-0">
                              <SubSectionHeader emoji="✨" title="기억하고 싶은 순간" />
                              <div className="flex flex-col gap-1 items-start justify-start relative shrink-0 w-full">
                                {a.weekly_notes.moments.slice(0, 4).map((moment: string, idx: number) => (
                                  <ListItem key={idx}>{moment}</ListItem>
                                ))}
                              </div>
                            </div>
                          )}

                          {a.weekly_notes.lessons && a.weekly_notes.lessons.length > 0 && (
                            <div className="basis-0 flex flex-col gap-3 grow items-start justify-start min-h-px min-w-[348px] relative shrink-0">
                              <SubSectionHeader emoji="📚" title="교훈" />
                              <div className="flex flex-col gap-1 items-start justify-start relative shrink-0 w-full">
                                {a.weekly_notes.lessons.slice(0, 4).map((lesson: string, idx: number) => (
                                  <ListItem key={idx}>{lesson}</ListItem>
                                ))}
                              </div>
                            </div>
                          )}

                          {a.weekly_notes.ideas && a.weekly_notes.ideas.length > 0 && (
                            <div className="basis-0 flex flex-col gap-3 grow items-start justify-start min-h-px min-w-[348px] relative shrink-0">
                              <SubSectionHeader emoji="💡" title="아이디어" />
                              <div className="flex flex-col gap-1 items-start justify-start relative shrink-0 w-full">
                                {a.weekly_notes.ideas.slice(0, 4).map((idea: string, idx: number) => (
                                  <ListItem key={idx}>{idea}</ListItem>
                                ))}
                              </div>
                            </div>
                          )}

                          {a.weekly_notes.quotes && a.weekly_notes.quotes.length > 0 && (
                            <div className="basis-0 flex flex-col gap-3 grow items-start justify-start min-h-px min-w-[348px] relative shrink-0">
                              <SubSectionHeader emoji="💬" title="문장" />
                              <div className="flex flex-col gap-1 items-start justify-start relative shrink-0 w-full">
                                {a.weekly_notes.quotes.slice(0, 4).map((quote: string, idx: number) => (
                                  <ListItem key={idx}>{quote}</ListItem>
                                ))}
                              </div>
                            </div>
                          )}

                          {a.weekly_notes.feelings && a.weekly_notes.feelings.length > 0 && (
                            <div className="basis-0 flex flex-col gap-3 grow items-start justify-start min-h-px min-w-[348px] relative shrink-0">
                              <SubSectionHeader emoji="❤️" title="감정" />
                              <div className="flex flex-col gap-1 items-start justify-start relative shrink-0 w-full">
                                {a.weekly_notes.feelings.slice(0, 4).map((feeling: string, idx: number) => (
                                  <ListItem key={idx}>{feeling}</ListItem>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </DashboardCard>
                    )}

                    {/* 추천 명언 */}
                    {a.quote && a.quote.text && (
                      <div className="relative rounded-[16px] shrink-0 w-full">
                        <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[16px]" />
                        <div className="flex flex-col items-center justify-center relative size-full">
                          <div className="box-border flex flex-col gap-6 items-center justify-center p-[40px] relative w-full">
                            <div className="flex gap-2.5 items-center justify-start relative shrink-0 w-full">
                              <div className="shrink-0 size-6 flex items-center justify-center text-[18px]">💫</div>
                              <div className="font-pretendard font-medium leading-[0] not-italic relative shrink-0 text-[#1e2939] text-[18px] text-nowrap">
                                <p className="leading-[28px] whitespace-pre">추천 명언</p>
                              </div>
                            </div>
                            <div className="bg-slate-50 relative rounded-[16px] shrink-0 w-full">
                              <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
                                <div className="box-border flex flex-col gap-8 items-center justify-center px-5 py-8 relative w-full">
                                  <div className="font-pretendard font-medium leading-[0] not-italic relative shrink-0 text-[#364153] text-[20px] text-center text-nowrap">
                                    <p className="leading-[28px] whitespace-pre-wrap">
                                      {a.quote.text}
                                      {a.quote.author && <><br />- {a.quote.author}</>}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 응원 멘트 */}
                    <div className="relative rounded-[16px] shrink-0 w-full">
                      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[16px]" />
                      <div className="flex flex-col items-center justify-center relative size-full">
                        <div className="box-border flex flex-col gap-6 items-center justify-center p-[40px] relative w-full">
                          <div className="flex gap-2.5 items-center justify-start relative shrink-0 w-full">
                            <div className="shrink-0 size-6 flex items-center justify-center text-[18px]">💌</div>
                            <div className="font-pretendard font-medium leading-[0] not-italic relative shrink-0 text-[#1e2939] text-[18px] text-nowrap">
                              <p className="leading-[28px] whitespace-pre">응원 멘트</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3 items-start justify-start relative shrink-0 w-full">
                            <EncouragementCard 
                              title="같이 산책하는 친구" 
                              content="이번 주는 진짜 '시도'가 많았네. 러닝, 모임 다 쉽지 않은데 다 해낸 거잖아. 조금 아쉬운 부분도 있었지만 그게 바로 성장 중이라는 증거야. 다음엔 더 편하게 할 수 있을 거야. 나도 네가 점점 단단해지는 게 보여서 뿌듯해 😊" 
                              emoji="🚶‍♀️" 
                            />
                            <EncouragementCard 
                              title="응원하는 동료" 
                              content="운동하는 모습 정말 멋져! 헬스, 러닝, 클라이밍까지 다양하게 시도하는 게 인상적이야. 특히 3km에서 5.5km까지 늘어난 건 정말 대단한 발전이라고 생각해. 꾸준히 하면 분명 더 큰 변화가 있을 거야 💪" 
                              emoji="💪" 
                            />
                            <EncouragementCard 
                              title="성장을 지켜보는 멘토" 
                              content="독서 모임에서 받은 피드백을 통해 자기 인식이 바뀐 것도 좋은 성장이었어. '포장'에 대한 생각이 바뀐 건 앞으로 많은 도움이 될 거야. 계속 이런 식으로 열린 마음으로 배워나가면 좋겠어 📚" 
                              emoji="🌱" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 한 줄 선언 */}
                    {a.declaration && (
                      <div className="relative rounded-[16px] shrink-0 w-full">
                        <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[16px]" />
                        <div className="flex flex-col items-center justify-center relative size-full">
                          <div className="box-border flex flex-col gap-6 items-center justify-center p-[40px] relative w-full">
                            <div className="flex gap-2.5 items-center justify-start relative shrink-0 w-full">
                              <div className="shrink-0 size-6 flex items-center justify-center text-[18px]">✨</div>
                              <div className="font-pretendard font-medium leading-[0] not-italic relative shrink-0 text-[#1e2939] text-[18px] text-nowrap">
                                <p className="leading-[28px] whitespace-pre">한 줄 선언</p>
                              </div>
                            </div>
                            <div className="bg-slate-50 relative rounded-[16px] shrink-0 w-full">
                              <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
                                <div className="box-border flex flex-col gap-8 items-center justify-center px-5 py-8 relative w-full">
                                  <div className="font-pretendard font-medium leading-[0] not-italic relative shrink-0 text-[#364153] text-[20px] text-center text-nowrap">
                                    <p className="leading-[28px] whitespace-pre">{a.declaration}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Bottom Margin */}
                    <div className="h-[160px]"></div>
              </div>
            );
          }}
        />
          </>
      )}
      </div>
    </div>
  );
}


