export default function Badge({ label }: { label: string }) {
  return (
    <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-mono
      bg-white/5 text-slate-350 border border-white/10 whitespace-nowrap transition-all duration-300 hover:bg-white/10 hover:text-slate-100 hover:border-white/20">
      {label}
    </span>
  );
}
