interface CoachingBlockProps {
  coaching?: {
    ST: string;
    NF: string;
  };
}

export default function CoachingBlock({ coaching }: CoachingBlockProps) {
  if (!coaching) {
    return (
      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <h3 className="font-semibold mb-3">코칭 멘트</h3>
        <div className="text-gray-500 text-sm">코칭 데이터를 불러오는 중...</div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border bg-white p-5 shadow-sm">
      <h3 className="font-semibold mb-3">코칭 멘트</h3>
      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-sm text-gray-600 mb-1">ST (현실적 조언)</h4>
          <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded border-l-4 border-blue-500">
            {coaching.ST}
          </p>
        </div>
        <div>
          <h4 className="font-medium text-sm text-gray-600 mb-1">NF (공감 멘토)</h4>
          <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded border-l-4 border-green-500">
            {coaching.NF}
          </p>
        </div>
      </div>
    </section>
  );
}
