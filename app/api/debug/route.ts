import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const debugInfo = {
    hasOpenAIKey: !!process.env.OPENAI_API_KEY,
    openAIKeyPrefix: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 10) + "..." : "없음",
    openAIModel: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  };

  console.log("🔍 디버그 정보:", debugInfo);

  return NextResponse.json(debugInfo);
}
