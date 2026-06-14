interface Props {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ label, title, subtitle }: Props) {
  return (
    <div className="mb-16">
      <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">{label}</span>
      <h2 className="mt-2 text-4xl md:text-5xl font-bold text-text">{title}</h2>
      {subtitle && <p className="mt-3 text-textSoft max-w-xl">{subtitle}</p>}
      <div className="mt-4 h-px w-16 bg-accent opacity-60" />
    </div>
  );
}
