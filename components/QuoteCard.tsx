interface QuoteCardProps {
  quote?: {
    text: string;
    author: string;
  };
}

export default function QuoteCard({ quote }: QuoteCardProps) {
  if (!quote) {
    return (
      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <h3 className="font-semibold mb-3">명언</h3>
        <div className="text-gray-500 text-sm">명언 데이터를 불러오는 중...</div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border bg-white p-5 shadow-sm">
      <h3 className="font-semibold mb-3">명언</h3>
      <blockquote className="text-center">
        <p className="text-lg text-gray-800 italic mb-2">"{quote.text}"</p>
        <footer className="text-sm text-gray-600">- {quote.author}</footer>
      </blockquote>
    </section>
  );
}
