type Props = { text?: string };

export default function SupportNote({ text }: Props) {
  if (!text) {
    return (
      <div className="text-gray-500 text-sm">응원 메시지를 불러오는 중...</div>
    );
  }

  return <p className="text-sm text-gray-700">{text}</p>;
}


