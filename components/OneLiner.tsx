interface OneLinerProps {
  text?: string;
}

export default function OneLiner({ text }: OneLinerProps) {
  if (!text) {
    return (
      <div className="text-gray-500 text-sm">한 줄 요약을 불러오는 중...</div>
    );
  }

  return (
    <div className="text-gray-700 text-sm leading-relaxed">
      {text}
    </div>
  );
}
