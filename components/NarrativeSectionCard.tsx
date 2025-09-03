type Props = {
  title: string;
  body: string;
  improvements: string[];
};

export default function NarrativeSectionCard({ title, body, improvements }: Props) {
  return (
    <section className="rounded-lg border bg-white p-5 mb-5 shadow-sm">
      <h3 className="text-base font-semibold mb-2">{title}</h3>
      <p className="mb-3 leading-7 whitespace-pre-line">{body}</p>
      {improvements?.length > 0 && (
        <div className="mt-2">
          <div className="text-xs font-medium text-gray-500 mb-1">개선 포인트</div>
          <div className="text-sm text-gray-800 space-y-1">
            {improvements.map((it, i) => (
              <div key={i}>{it}</div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}


