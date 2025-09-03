import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  try {
    const retro = await prisma.retro.findUnique({
      where: { id },
      include: { analysis: true },
    });
    if (!retro || !retro.analysis) {
      res.status(404).json({ error: 'Not Found' });
      return;
    }
    res.status(200).json({ narrative: retro.analysis.narrative, analysis: retro.analysis.analysis });
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? 'Internal Server Error' });
  }
}







