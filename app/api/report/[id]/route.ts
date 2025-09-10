import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// OPTIONS 메서드 지원 (CORS)
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 200 });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('Report API called with method:', request.method);
    console.log('Request URL:', request.url);
    
    const { id } = await params;
    console.log('Report ID:', id);
    
    // 데이터베이스 연결 시도
    try {
      const retro = await prisma.retro.findUnique({
        where: { id },
        include: { analysis: true },
      });
      
      if (retro && retro.analysis) {
        return NextResponse.json({ 
          narrative: retro.analysis.narrative, 
          analysis: retro.analysis.analysis 
        });
      }
    } catch (dbError) {
      // 데이터베이스 연결 실패 시 로그만 남기고 계속 진행
      console.warn('Database connection failed, falling back to session storage:', dbError);
    }
    
    // 데이터베이스에서 찾지 못한 경우 404 반환
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json(
      { error: err?.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}
