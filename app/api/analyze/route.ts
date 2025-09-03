import { NextRequest, NextResponse } from "next/server";
import { analyze } from "@/lib/analyze";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
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
    } catch {
      // DB 미설정/오류 시 저장을 건너뛰고 결과만 반환
      return NextResponse.json(result);
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}
