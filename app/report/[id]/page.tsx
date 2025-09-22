"use client";
import { useEffect, useMemo, useState } from "react";
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

// 점수 표시 여부 판단 함수
function shouldShowScore(area: string, analysis: any, narrative: any): boolean {
  const sections = narrative?.sections || [];
  
  switch (area) {
    case 'work':
      // 일/커리어 관련 섹션이 있고 내용이 충분한지 확인
      const workSection = sections.find((s: any) => {
        // 운동 관련 섹션은 제외
        if (s.title?.includes('운동') || s.title?.includes('피티') || s.title?.includes('크로스핏') || s.title?.includes('러닝') || 
            s.title?.includes('헬스') || s.title?.includes('발레') || s.title?.includes('무용')) {
          return false;
        }
        
        // 일/커리어 관련 키워드만 찾기
        return s.title?.includes('일') || s.title?.includes('커리어') || s.title?.includes('기술') || s.title?.includes('학습') || 
               s.title?.includes('면접') || s.title?.includes('도전') || s.title?.includes('포트폴리오') || s.title?.includes('AI') || s.title?.includes('강의') ||
               s.title?.includes('프로젝트') || s.title?.includes('발표') || s.title?.includes('취업') || s.title?.includes('레퍼런스') ||
               s.body?.includes('포트폴리오') || s.body?.includes('피드백') || s.body?.includes('AI') || s.body?.includes('강의') || 
               s.body?.includes('프로젝트') || s.body?.includes('발표') || s.body?.includes('스티키') || s.body?.includes('레쥬메') || 
               s.body?.includes('취업') || s.body?.includes('레퍼런스') || s.body?.includes('사내') || s.body?.includes('시사') ||
               s.body?.includes('도움이') || s.body?.includes('재밌어서') || s.body?.includes('면접') || s.body?.includes('디자인') || s.body?.includes('리더');
      });
      // console.log('Work section found:', workSection);
      return workSection && workSection.body && workSection.body.length > 10;
      
    case 'health':
      // 건강/운동 관련 섹션이 있고 내용이 충분한지 확인
      const healthSection = sections.find((s: any) => 
        s.title?.includes('운동') || s.title?.includes('몸') || s.title?.includes('건강') || s.title?.includes('수면')
      );
      return healthSection && healthSection.body && healthSection.body.length > 10;
      
    case 'relationships':
      // 관계 관련 섹션이 있고 내용이 충분한지 확인
      const relationshipSection = sections.find((s: any) => 
        s.title?.includes('관계') || s.title?.includes('대화') || s.title?.includes('모임') || s.title?.includes('독서') || 
        s.title?.includes('책') || s.title?.includes('시작') || s.title?.includes('트레바리') || s.title?.includes('친구') ||
        s.body?.includes('트레바리') || s.body?.includes('모임') || s.body?.includes('대화') || s.body?.includes('독서') || s.body?.includes('책') ||
        s.body?.includes('친구') || s.body?.includes('결혼식') || s.body?.includes('브라질') || s.body?.includes('독서모임')
      );
      // console.log('Relationship section found:', relationshipSection);
      return relationshipSection && relationshipSection.body && relationshipSection.body.length > 10;
      
    case 'emotions':
      // 감정 관련 섹션이나 감정적 내용이 있는지 확인
      const emotionSection = sections.find((s: any) => {
        // 운동 관련 섹션은 제외
        if (s.title?.includes('운동') || s.title?.includes('피티') || s.title?.includes('크로스핏') || s.title?.includes('러닝') || 
            s.title?.includes('헬스') || s.title?.includes('발레') || s.title?.includes('무용')) {
          return false;
        }
        
        // 감정 관련 키워드만 찾기
        return s.title?.includes('감정') || s.title?.includes('표현') || s.title?.includes('자신') || s.title?.includes('성장') ||
               s.title?.includes('뮤지컬') || s.title?.includes('문화') || s.title?.includes('생활') || s.title?.includes('넘버') ||
               s.body?.includes('소름') || s.body?.includes('감동') || s.body?.includes('노트르담') || s.body?.includes('뮤지컬') || 
               s.body?.includes('소름이') || s.body?.includes('돋았고') || s.body?.includes('감동적인') || s.body?.includes('순간') ||
               s.body?.includes('풍부하게') || s.body?.includes('느끼게') || s.body?.includes('자신감') || s.body?.includes('용기') || 
               s.body?.includes('깨달음') || s.body?.includes('에너지') || s.body?.includes('넘침') || s.body?.includes('좋다');
      });
      return emotionSection && emotionSection.body && emotionSection.body.length > 10;
      
    default:
      return false;
  }
}

// Life Score 점수 생성 함수
function generateLifeScore(area: string, analysis: any, narrative: any): number | null {
  const sections = narrative?.sections || [];
  
  switch (area) {
    case 'work':
      const workSection = sections.find((s: any) => {
        // 운동 관련 섹션은 제외
        if (s.title?.includes('운동') || s.title?.includes('피티') || s.title?.includes('크로스핏') || s.title?.includes('러닝') || 
            s.title?.includes('헬스') || s.title?.includes('발레') || s.title?.includes('무용')) {
          return false;
        }
        
        // 일/커리어 관련 키워드만 찾기
        return s.title?.includes('일') || s.title?.includes('커리어') || s.title?.includes('기술') || s.title?.includes('학습') || 
               s.title?.includes('면접') || s.title?.includes('도전') || s.title?.includes('포트폴리오') || s.title?.includes('AI') || s.title?.includes('강의') ||
               s.title?.includes('프로젝트') || s.title?.includes('발표') || s.title?.includes('취업') || s.title?.includes('레퍼런스') ||
               s.body?.includes('포트폴리오') || s.body?.includes('피드백') || s.body?.includes('AI') || s.body?.includes('강의') || 
               s.body?.includes('프로젝트') || s.body?.includes('발표') || s.body?.includes('스티키') || s.body?.includes('레쥬메') || 
               s.body?.includes('취업') || s.body?.includes('레퍼런스') || s.body?.includes('사내') || s.body?.includes('시사') ||
               s.body?.includes('도움이') || s.body?.includes('재밌어서') || s.body?.includes('면접') || s.body?.includes('디자인') || s.body?.includes('리더');
      });
      if (workSection && workSection.body && workSection.body.length > 10) {
        // 면접 경험, 학습 내용, 성과 등을 바탕으로 점수 계산
        const body = workSection.body.toLowerCase();
        let score = 5; // 기본 점수
        
        if (body.includes('포트폴리오') || body.includes('피드백')) score += 2;
        if (body.includes('ai') || body.includes('강의')) score += 1;
        if (body.includes('프로젝트') || body.includes('발표')) score += 1;
        if (body.includes('스티키') || body.includes('레쥬메')) score += 1;
        if (body.includes('자신감') || body.includes('성과')) score += 1;
        if (body.includes('아쉬움') || body.includes('부족')) score -= 1;
        
        return Math.min(10, Math.max(1, score));
      }
      return null;
      
    case 'health':
      const healthSection = sections.find((s: any) => 
        s.title?.includes('운동') || s.title?.includes('몸') || s.title?.includes('건강') || s.title?.includes('수면') || s.title?.includes('체력')
      );
      if (healthSection && healthSection.body && healthSection.body.length > 10) {
        const body = healthSection.body.toLowerCase();
        let score = 5;
        
        if (body.includes('헬스') || body.includes('러닝') || body.includes('클라이밍')) score += 2;
        if (body.includes('5.5km') || body.includes('달성') || body.includes('완주')) score += 2;
        if (body.includes('수면') && body.includes('6시간')) score += 1;
        if (body.includes('부족') || body.includes('아쉬움')) score -= 1;
        
        return Math.min(10, Math.max(1, score));
      }
      return null;
      
    case 'relationships':
      const relationshipSection = sections.find((s: any) => 
        s.title?.includes('관계') || s.title?.includes('대화') || s.title?.includes('모임') || s.title?.includes('독서') || 
        s.title?.includes('책') || s.title?.includes('시작') || s.title?.includes('트레바리') || s.title?.includes('친구') ||
        s.body?.includes('트레바리') || s.body?.includes('모임') || s.body?.includes('대화') || s.body?.includes('독서') || s.body?.includes('책') ||
        s.body?.includes('친구') || s.body?.includes('결혼식') || s.body?.includes('브라질') || s.body?.includes('독서모임')
      );
      if (relationshipSection && relationshipSection.body && relationshipSection.body.length > 10) {
        const body = relationshipSection.body.toLowerCase();
        let score = 5;
        
        if (body.includes('트레바리') || body.includes('모임')) score += 2;
        if (body.includes('친구') || body.includes('결혼식')) score += 2;
        if (body.includes('대화') || body.includes('소통')) score += 1;
        if (body.includes('독서') || body.includes('책')) score += 1;
        if (body.includes('브라질') || body.includes('이야기')) score += 1;
        if (body.includes('부족') || body.includes('아쉬움')) score -= 1;
        
        return Math.min(10, Math.max(1, score));
      }
      return null;
      
    case 'emotions':
      const emotionSection = sections.find((s: any) => {
        // 운동 관련 섹션은 제외
        if (s.title?.includes('운동') || s.title?.includes('피티') || s.title?.includes('크로스핏') || s.title?.includes('러닝') || 
            s.title?.includes('헬스') || s.title?.includes('발레') || s.title?.includes('무용')) {
          return false;
        }
        
        // 감정 관련 키워드만 찾기
        return s.title?.includes('감정') || s.title?.includes('표현') || s.title?.includes('자신') || s.title?.includes('성장') ||
               s.title?.includes('뮤지컬') || s.title?.includes('문화') || s.title?.includes('생활') || s.title?.includes('넘버') ||
               s.body?.includes('소름') || s.body?.includes('감동') || s.body?.includes('노트르담') || s.body?.includes('뮤지컬') || 
               s.body?.includes('소름이') || s.body?.includes('돋았고') || s.body?.includes('감동적인') || s.body?.includes('순간') ||
               s.body?.includes('풍부하게') || s.body?.includes('느끼게') || s.body?.includes('자신감') || s.body?.includes('용기') || 
               s.body?.includes('깨달음') || s.body?.includes('에너지') || s.body?.includes('넘침') || s.body?.includes('좋다');
      });
      if (emotionSection && emotionSection.body && emotionSection.body.length > 10) {
        const body = emotionSection.body.toLowerCase();
        let score = 5;
        
        if (body.includes('소름') || body.includes('감동')) score += 2;
        if (body.includes('뮤지컬') || body.includes('노트르담')) score += 2;
        if (body.includes('자신감') || body.includes('성장')) score += 1;
        if (body.includes('용기') || body.includes('깨달음')) score += 1;
        if (body.includes('에너지') || body.includes('넘침')) score += 1;
        if (body.includes('아쉬움') || body.includes('부족')) score -= 1;
        
        return Math.min(10, Math.max(1, score));
      }
      return null;
      
    default:
      return null;
  }
}

// 30자 이내로 의미있는 요약을 만드는 함수
function truncateTo30Chars(text: string): string {
  if (!text) return '';
  
  // 문장 단위로 나누기
  const sentences = text.split(/[.!?。！？]/).filter(s => s.trim().length > 0);
  
  if (sentences.length === 0) return '';
  
  // 첫 번째 문장이 30자 이내면 그대로 사용
  let firstSentence = sentences[0].trim();
  
  // 콤마로 끝나면 제거
  if (firstSentence.endsWith(',')) {
    firstSentence = firstSentence.slice(0, -1);
  }
  
  if (firstSentence.length <= 30) {
    return firstSentence;
  }
  
  // 30자 이내에서 마지막 공백을 찾아서 단어 단위로 자르기
  let truncated = firstSentence.substring(0, 30);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > 15) { // 너무 짧게 자르지 않도록
    truncated = truncated.substring(0, lastSpaceIndex);
  }
  
  // 콤마로 끝나면 제거
  if (truncated.endsWith(',')) {
    truncated = truncated.slice(0, -1);
  }
  
  return truncated;
}

// Life Score 설명 생성 함수 (30자 이내 요약)
function generateLifeScoreDescription(area: string, analysis: any, narrative: any): string {
  // 먼저 점수 표시 여부를 확인
  const canShowScore = shouldShowScore(area, analysis, narrative);
  // console.log(`${area} canShowScore:`, canShowScore);
  
  if (!canShowScore) {
    return '분석 내용 부족';
  }
  
  const sections = narrative?.sections || [];
  
  switch (area) {
    case 'work':
      const workSection = sections.find((s: any) => {
        // 운동 관련 섹션은 제외
        if (s.title?.includes('운동') || s.title?.includes('피티') || s.title?.includes('크로스핏') || s.title?.includes('러닝') || 
            s.title?.includes('헬스') || s.title?.includes('발레') || s.title?.includes('무용')) {
          return false;
        }
        
        // 일/커리어 관련 키워드만 찾기
        return s.title?.includes('일') || s.title?.includes('커리어') || s.title?.includes('기술') || s.title?.includes('학습') || 
               s.title?.includes('면접') || s.title?.includes('도전') || s.title?.includes('포트폴리오') || s.title?.includes('AI') || s.title?.includes('강의') ||
               s.title?.includes('프로젝트') || s.title?.includes('발표') || s.title?.includes('취업') || s.title?.includes('레퍼런스') ||
               s.body?.includes('포트폴리오') || s.body?.includes('피드백') || s.body?.includes('AI') || s.body?.includes('강의') || 
               s.body?.includes('프로젝트') || s.body?.includes('발표') || s.body?.includes('스티키') || s.body?.includes('레쥬메') || 
               s.body?.includes('취업') || s.body?.includes('레퍼런스') || s.body?.includes('사내') || s.body?.includes('시사') ||
               s.body?.includes('도움이') || s.body?.includes('재밌어서') || s.body?.includes('면접') || s.body?.includes('디자인') || s.body?.includes('리더');
      });
      // console.log('workSection found:', workSection);
      if (workSection && workSection.body) {
        const body = workSection.body.toLowerCase();
        if (body.includes('포트폴리오') && body.includes('피드백')) {
          return '포트폴리오 피드백과 용기';
        } else if (body.includes('ai') && body.includes('강의')) {
          return 'AI 강의와 프로젝트 발표';
        } else if (body.includes('취업') && body.includes('레퍼런스')) {
          return '취업 레퍼런스 강의';
        } else if (body.includes('스티키') || body.includes('레쥬메')) {
          return '스티키 메시지와 레쥬메 수정';
        }
        return truncateTo30Chars(workSection.body);
      }
      return '분석 내용 부족';
      
    case 'health':
      const healthSection = sections.find((s: any) => 
        s.title?.includes('운동') || s.title?.includes('몸') || s.title?.includes('건강') || s.title?.includes('수면') || s.title?.includes('체력')
      );
      if (healthSection && healthSection.body) {
        const body = healthSection.body.toLowerCase();
        if (body.includes('피티') && body.includes('크로스핏') && body.includes('러닝')) {
          return '피티, 크로스핏, 러닝';
        } else if (body.includes('크로스핏') && body.includes('14분')) {
          return '크로스핏 14분 체험';
        } else if (body.includes('러닝') && body.includes('40분')) {
          return '러닝 40분 가이드';
        } else if (body.includes('발레') || body.includes('무용학원')) {
          return '발레와 무용학원 문의';
        } else if (body.includes('수면') && body.includes('5시간')) {
          return '수면 5시간과 낮잠';
        }
        return truncateTo30Chars(healthSection.body);
      }
      return '분석 내용 부족';
      
    case 'relationships':
      const relationshipSection = sections.find((s: any) => 
        s.title?.includes('관계') || s.title?.includes('대화') || s.title?.includes('모임') || s.title?.includes('독서') || 
        s.title?.includes('책') || s.title?.includes('시작') || s.title?.includes('트레바리') || s.title?.includes('친구') ||
        s.body?.includes('트레바리') || s.body?.includes('모임') || s.body?.includes('대화') || s.body?.includes('독서') || s.body?.includes('책') ||
        s.body?.includes('친구') || s.body?.includes('결혼식') || s.body?.includes('브라질') || s.body?.includes('독서모임')
      );
      if (relationshipSection && relationshipSection.body) {
        const body = relationshipSection.body.toLowerCase();
        if (body.includes('트레바리') && body.includes('독서')) {
          return '트레바리 독서모임';
        } else if (body.includes('친구') && body.includes('결혼식')) {
          return '친구와 브라질 결혼식 이야기';
        } else if (body.includes('독서모임') && body.includes('책')) {
          return '독서모임과 책 읽기';
        } else if (body.includes('트레바리')) {
          return '트레바리 모임과 피드백';
        }
        return truncateTo30Chars(relationshipSection.body);
      }
      return '분석 내용 부족';
      
    case 'emotions':
      // 감정 관련 섹션이나 감정적 내용이 있는 섹션 찾기
      const emotionSection = sections.find((s: any) => {
        // 운동 관련 섹션은 제외
        if (s.title?.includes('운동') || s.title?.includes('피티') || s.title?.includes('크로스핏') || s.title?.includes('러닝') || 
            s.title?.includes('헬스') || s.title?.includes('발레') || s.title?.includes('무용')) {
          return false;
        }
        
        // 감정 관련 키워드만 찾기
        return s.title?.includes('감정') || s.title?.includes('표현') || s.title?.includes('자신') || s.title?.includes('성장') ||
               s.title?.includes('뮤지컬') || s.title?.includes('문화') || s.title?.includes('생활') || s.title?.includes('넘버') ||
               s.body?.includes('소름') || s.body?.includes('감동') || s.body?.includes('노트르담') || s.body?.includes('뮤지컬') || 
               s.body?.includes('소름이') || s.body?.includes('돋았고') || s.body?.includes('감동적인') || s.body?.includes('순간') ||
               s.body?.includes('풍부하게') || s.body?.includes('느끼게') || s.body?.includes('자신감') || s.body?.includes('용기') || 
               s.body?.includes('깨달음') || s.body?.includes('에너지') || s.body?.includes('넘침') || s.body?.includes('좋다');
      });
      // console.log('emotionSection found:', emotionSection);
      if (emotionSection && emotionSection.body) {
        const body = emotionSection.body.toLowerCase();
        if (body.includes('소름') && body.includes('감동')) {
          return '소름과 감동의 뮤지컬';
        } else if (body.includes('에너지') && body.includes('넘침')) {
          return '에너지 넘치는 한 주';
        } else if (body.includes('용기') && body.includes('깨달음')) {
          return '용기와 깨달음의 순간';
        } else if (body.includes('자신감') && body.includes('강점')) {
          return '자신감과 강점 발견';
        } else if (body.includes('재밌어서')) {
          return '재미있는 AI 강의 경험';
        }
        return truncateTo30Chars(emotionSection.body);
      }
      return '분석 내용 부족';
      
    default:
      return '해당 영역 내용 부족';
  }
}

// 원형 점수 컴포넌트 (간단한 구조)
function CircularScore({ title, score, description, emoji }: { title: string; score: number | null; description: string; emoji: string }) {
  const displayScore = score !== null ? score : '?';
  const percentage = score !== null ? (score / 10) * 100 : 0;
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
            {/* 진행률 원 - 점수가 있을 때만 표시 */}
            {score !== null && (
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
            )}
          </svg>
          {/* 중앙 텍스트 */}
          <div className="absolute flex items-center justify-center">
            <span className="font-pretendard font-medium text-[#1d293d] text-[20px] leading-[28px]">{displayScore}</span>
            {score !== null && (
              <span className="font-pretendard font-normal text-[#90a1b9] text-[12px] leading-[16px]">/10</span>
            )}
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
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  const [payload, setPayload] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
    };
    resolveParams();
  }, [params]);

  const id = resolvedParams?.id;

  useEffect(() => {
    if (!id) return;
    
    const fetchFromApi = async () => {
      try {
        console.log('Fetching report for ID:', id);
        const res = await fetch(`/api/report/${id}`);
        console.log('Report API response status:', res.status);
        
        if (res.ok) {
          const data = await res.json();
          console.log('Report data received:', data);
          setPayload(data);
          return;
        } else {
          const errorText = await res.text();
          console.warn(`API returned ${res.status}: ${res.statusText}`, errorText);
        }
      } catch (error) {
        console.warn('API fetch failed:', error);
      }
      
      // fallback to session (older flow)
      const raw = sessionStorage.getItem("lastReport");
      if (raw) {
        try {
          const obj = JSON.parse(raw);
          // id가 달라도 세션의 최신 결과를 우선 표시
          if (obj?.data) {
            setPayload(obj.data);
            return;
          }
        } catch (error) {
          console.warn('Session storage parse failed:', error);
        }
      }
      
      // 마지막 fallback: localStorage에서 시도
      const localRaw = localStorage.getItem("lastReport");
      if (localRaw) {
        try {
          const obj = JSON.parse(localRaw);
          if (obj?.data) {
            setPayload(obj.data);
            return;
          }
        } catch (error) {
          console.warn('Local storage parse failed:', error);
        }
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
                          score={generateLifeScore('work', a, payload.narrative)} 
                          description={generateLifeScoreDescription('work', a, payload.narrative)}
                        />
                        <CircularScore 
                          title="몸/건강" 
                          emoji="🧘‍♀️"
                          score={generateLifeScore('health', a, payload.narrative)} 
                          description={generateLifeScoreDescription('health', a, payload.narrative)}
                        />
                        <CircularScore 
                          title="관계" 
                          emoji="👥"
                          score={generateLifeScore('relationships', a, payload.narrative)} 
                          description={generateLifeScoreDescription('relationships', a, payload.narrative)}
                        />
                        <CircularScore 
                          title="감정" 
                          emoji="❤️"
                          score={generateLifeScore('emotions', a, payload.narrative)} 
                          description={generateLifeScoreDescription('emotions', a, payload.narrative)}
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
                            {a.support && a.support.walking_friend && (
                              <EncouragementCard 
                                title="같이 산책하는 친구" 
                                content={a.support.walking_friend} 
                                emoji="🚶‍♀️" 
                              />
                            )}
                            {a.support && a.support.supportive_colleague && (
                              <EncouragementCard 
                                title="응원하는 동료" 
                                content={a.support.supportive_colleague} 
                                emoji="💪" 
                              />
                            )}
                            {a.support && a.support.growth_mentor && (
                              <EncouragementCard 
                                title="성장을 지켜보는 멘토" 
                                content={a.support.growth_mentor} 
                                emoji="🌱" 
                              />
                            )}
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


