import { NextRequest, NextResponse } from "next/server";
import { analyze } from "@/lib/analyze";
import { prisma } from "@/lib/db";

// OPTIONS 메서드 지원 (CORS)
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    console.log('Analyze API called with method:', request.method);
    console.log('Request URL:', request.url);
    
    const body = await request.json();
    const raw = String(body?.raw_text ?? "");
    
    const result = await analyze(raw);
    
    try {
      const retro = await prisma.retro.create({
        data: {
          rawText: raw,
          analysis: {
            create: {
              narrative: result.narrative as any,
              analysis: result.analysis as any,
            },
          },
        },
        include: { analysis: true },
      });
      
      const response = NextResponse.json(result);
      response.headers.set("X-Report-Id", retro.id);
      return response;
    } catch (dbError) {
      // DB 미설정/오류 시 저장을 건너뛰고 결과만 반환
      console.warn('Database save failed, returning result without saving:', dbError);
      return NextResponse.json(result);
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}
