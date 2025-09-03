import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const retro = await prisma.retro.findUnique({
      where: { id },
      include: { analysis: true },
    });
    
    if (!retro || !retro.analysis) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
    
    return NextResponse.json({ 
      narrative: retro.analysis.narrative, 
      analysis: retro.analysis.analysis 
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}
