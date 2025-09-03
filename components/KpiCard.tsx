type Props = {
  label: string;
  value: string | number;
};

export default function KpiCard({ label, value }: Props) {
  return (
    <div className="border rounded p-4 text-center">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-2xl font-bold">{String(value)}</div>
    </div>
  );
}



