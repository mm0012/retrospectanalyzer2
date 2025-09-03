type Props = { items: string[] };

export default function TodoList({ items }: Props) {
  return (
    <ul className="list-disc pl-5">
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}



