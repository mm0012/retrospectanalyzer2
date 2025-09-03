type Props = {
  patterns: string[];
  simulations: string[];
  self_explainer: string;
};

export default function InsightBlock({ patterns, simulations, self_explainer }: Props) {
  return (
    <section className="border rounded p-4">
      <h3 className="font-semibold mb-2">인사이트</h3>
      <div className="mb-2">
        <div className="text-sm font-medium">패턴</div>
        <ul className="list-disc pl-5">
          {patterns.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>
      <div className="mb-2">
        <div className="text-sm font-medium">가정 시뮬레이션</div>
        <ul className="list-disc pl-5">
          {simulations.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
      <div>
        <div className="text-sm font-medium">자기 설명</div>
        <p className="text-sm text-gray-700">{self_explainer}</p>
      </div>
    </section>
  );
}



