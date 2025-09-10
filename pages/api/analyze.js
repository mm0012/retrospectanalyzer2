// Pages Router 방식의 분석 API (Vercel 호환성)
import { analyze } from '../lib/analyze.js';
import { prisma } from '../lib/db.js';

export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    console.log('Analyze API called with method:', req.method);
    console.log('Request URL:', req.url);
    
    const raw = String(req.body?.raw_text ?? "");
    
    const result = await analyze(raw);
    
    try {
      const retro = await prisma.retro.create({
        data: {
          rawText: raw,
          analysis: {
            create: {
              narrative: result.narrative,
              analysis: result.analysis,
            },
          },
        },
        include: { analysis: true },
      });
      
      res.setHeader('X-Report-Id', retro.id);
      res.status(200).json(result);
    } catch (dbError) {
      // DB 미설정/오류 시 저장을 건너뛰고 결과만 반환
      console.warn('Database save failed, returning result without saving:', dbError);
      res.status(200).json(result);
    }
  } catch (err) {
    console.error('Analyze API error:', err);
    res.status(500).json({ error: err?.message ?? "Internal Server Error" });
  }
}
