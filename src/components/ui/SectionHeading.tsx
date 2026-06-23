interface Props {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ label, title, subtitle }: Props) {
  return (
    <div className="mb-16 relative">
      <span className="font-mono text-xs text-accent tracking-[0.25em] uppercase font-bold block mb-2">{label}</span>
      <h2 className="text-4xl md:text-5xl font-display font-black text-slate-100 tracking-tight leading-tight">{title}</h2>
      {subtitle && <p className="mt-3 text-slate-400 text-sm md:text-base max-w-xl font-sans">{subtitle}</p>}
      <div className="mt-5 h-[2px] w-20 bg-gradient-to-r from-accent to-accent-teal rounded-full shadow-[0_0_10px_rgba(99,102,241,0.2)]" />
    </div>
  );
}
