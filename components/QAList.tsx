interface QAListProps {
  qa?: Array<{
    q: string;
    a: string;
  }>;
}

export default function QAList({ qa }: QAListProps) {
  if (!qa || qa.length === 0) {
    return (
      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <h3 className="font-semibold mb-3">1문 1답</h3>
        <div className="text-gray-500 text-sm">Q&A 데이터를 불러오는 중...</div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border bg-white p-5 shadow-sm">
      <h3 className="font-semibold mb-3">1문 1답</h3>
      <div className="space-y-4">
        {qa.map((item, idx) => (
          <div key={idx} className="border-l-4 border-blue-500 pl-4">
            <div className="font-medium text-gray-800 mb-1">Q. {item.q}</div>
            <div className="text-gray-600">A. {item.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
