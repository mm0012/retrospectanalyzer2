"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TextEditor from "@/components/TextEditor";
import AnalyzeButton from "@/components/AnalyzeButton";

export default function HomePage() {
  const [rawText, setRawText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();

  const handleAnalyze = async () => {
    if (!rawText.trim()) return;

    setIsAnalyzing(true);
    
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ raw_text: rawText }),
      });

      if (res.ok) {
        const reportId = res.headers.get("X-Report-Id") || Date.now().toString();
        const data = await res.json();
        
        // 세션과 로컬 스토리지에 모두 저장 (Vercel 배포 시 안정성을 위해)
        const reportData = { id: reportId, data };
        sessionStorage.setItem("lastReport", JSON.stringify(reportData));
        localStorage.setItem("lastReport", JSON.stringify(reportData));
        
        // 리포트 페이지로 이동
        router.push(`/report/${reportId}`);
      }
    } catch (error) {
      console.error("분석 중 오류 발생:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white relative w-full min-h-screen">
      {/* Header */}
      <div className="absolute box-border flex gap-2.5 items-center justify-start left-0 px-[200px] py-2.5 top-0 w-full">
        <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-slate-100 border-solid inset-0 pointer-events-none" />
        <div className="font-pretendard font-medium leading-[0] not-italic relative shrink-0 text-[18px] text-gray-950 text-nowrap">
          <p className="leading-[28px] whitespace-pre">회고 분석기</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="absolute flex flex-col gap-10 items-center justify-start left-1/2 top-[138px] translate-x-[-50%] w-[800px]">
        {/* Title Section */}
        <div className="flex flex-col gap-[11px] items-center justify-start leading-[0] not-italic relative shrink-0 w-[438px]">
          <div className="font-pretendard font-semibold min-w-full relative shrink-0 text-[36px] text-center text-gray-950" style={{ width: "min-content" }}>
            <p className="leading-[40px]">회고를 분석해보세요</p>
          </div>
          <div className="font-pretendard font-normal relative shrink-0 text-[#6a7282] text-[18px] text-nowrap">
            <p className="leading-[28px] whitespace-pre">회고 원문을 입력하면 인사이트와 개선점을 분석해드립니다</p>
          </div>
        </div>

        {/* Input Section */}
        <div className="h-[400px] relative rounded-[16px] shrink-0 w-full">
          <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[16px]" />
          <div className="flex flex-col items-center justify-center relative size-full">
            <div className="box-border flex flex-col gap-10 h-[400px] items-center justify-center p-[40px] relative w-full">
              {/* Text Input */}
              <div className="basis-0 bg-slate-100 grow min-h-px min-w-px relative rounded-[16px] shrink-0 w-full">
                <div className="overflow-clip relative size-full">
                  <TextEditor
                    value={rawText}
                    onChange={setRawText}
                    placeholder="회고 원문을 입력하면 인사이트와 개선점을 분석해드립니다

예시:
- 이번 스프린트에서 잘했던 점
- 아쉬웠던 점  
- 개선이 필요한 부분
- 다음에 시도해볼 것들"
                    disabled={isAnalyzing}
                    className="box-border resize-none border-none bg-transparent outline-none w-full h-full p-5 font-pretendard font-normal text-[16px] text-gray-900 placeholder:text-[#99a1af] leading-[24px]"
                    style={{ minHeight: '300px' }}
                  />
                </div>
              </div>

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={!rawText.trim() || isAnalyzing}
                className="bg-[#020618] box-border flex items-center justify-center overflow-clip px-5 py-3 relative rounded-[24px] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#030725] transition-colors"
                data-name="Button"
              >
                <div className="flex items-center justify-center space-x-2">
                  {isAnalyzing && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  <div className="font-pretendard font-semibold leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
                    <p className="leading-[1.5] whitespace-pre">
                      {isAnalyzing ? '분석 중...' : '분석 시작하기'}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-slate-50 box-border flex gap-2.5 items-center justify-center px-5 py-2.5 relative rounded-[24px] shrink-0">
          <div className="font-pretendard font-normal leading-[0] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap">
            <p className="leading-[20px] whitespace-pre">회고 내용은 안전하게 처리되어 저장되지 않습니다.</p>
          </div>
        </div>
        
        {/* Bottom Margin */}
        <div className="h-[160px]"></div>
      </div>
    </div>
  );
}


