// Pages Router 방식의 API 라우트 (Vercel 호환성)
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'API is working!', method: 'GET' });
  } else if (req.method === 'POST') {
    res.status(200).json({ message: 'API is working!', method: 'POST' });
  } else if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
