export default function Badge({ label }: { label: string }) {
  return (
    <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-mono
      bg-accent/10 text-accent border border-accent/20 whitespace-nowrap">
      {label}
    </span>
  );
}
