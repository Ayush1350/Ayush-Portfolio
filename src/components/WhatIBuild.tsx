import { Monitor, Palette, Zap, Sparkles, Cpu, GitBranch, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection from './ui/AnimatedSection';
import TiltCard from './ui/TiltCard';

const capabilities = [
  {
    title: 'Frontend Engineering',
    description: 'Building highly responsive, accessible, and pixel-perfect web applications designed for complex client workflows.',
    icon: Monitor,
    color: 'text-[#7C3AED]',
    bgColor: 'bg-[#7C3AED]/10',
    borderColor: 'group-hover:border-[#7C3AED]/40',
    tech: ['TypeScript', 'JavaScript', 'Angular', 'Vue.js', 'Svelte', 'HTML5', 'CSS3'],
    metric: '99% accessibility compliance & 40% faster initial paint times.',
    span: 'md:col-span-2',
    visualPattern: 'circles'
  },
  {
    title: 'UI & Design Systems',
    description: 'Developing unified component systems that scale across product lines, ensuring branding and code consistency.',
    icon: Palette,
    color: 'text-[#06B6D4]',
    bgColor: 'bg-[#06B6D4]/10',
    borderColor: 'group-hover:border-[#06B6D4]/40',
    tech: ['Tailwind CSS', 'Bootstrap', 'Sass', 'Figma'],
    metric: '120+ tokens / 50% dev speedup.',
    span: 'md:col-span-1',
    visualPattern: 'grid'
  },
  {
    title: 'Performance Tuneups',
    description: 'Pinpoint performance audits, asset compression pipelines, dynamic loading, and bundle optimization.',
    icon: Zap,
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/10',
    borderColor: 'group-hover:border-amber-400/40',
    tech: ['Webpack', 'Vite', 'Lighthouse', 'Lazy Load'],
    metric: '95+ Lighthouse Perf Score.',
    span: 'md:col-span-1',
    visualPattern: 'bars'
  },
  {
    title: 'Interactive Experiences',
    description: 'Crafting responsive user interfaces with custom animations and transition patterns that guide user focus.',
    icon: Sparkles,
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/10',
    borderColor: 'group-hover:border-pink-400/40',
    tech: ['Framer Motion', 'GSAP', 'CSS Keyframes', 'SVG'],
    metric: '+25% session duration via refined UX.',
    span: 'md:col-span-2',
    visualPattern: 'wave'
  },
  {
    title: 'API & State Integration',
    description: 'Securing robust, high-performance API structures with clean data layers, global cache management, and authentication.',
    icon: Cpu,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'group-hover:border-purple-400/40',
    tech: ['REST APIs', 'GraphQL', 'Redux Toolkit', 'React Query', 'Axios'],
    metric: '15+ endpoints / -180ms latency.',
    span: 'md:col-span-2',
    visualPattern: 'dots'
  },
  {
    title: 'Developer Operations',
    description: 'Setting up testing pipelines, standardizing formats, and orchestrating automated deployments.',
    icon: GitBranch,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-400/10',
    borderColor: 'group-hover:border-indigo-400/40',
    tech: ['GitHub Actions', 'Jest', 'Cypress', 'ESLint', 'CI/CD'],
    metric: '90% unit test coverage & zero-downtime CI.',
    span: 'md:col-span-1',
    visualPattern: 'network'
  }
];

function CapabilityVisualDecoration({ pattern }: { pattern: string }) {
  if (pattern === 'circles') {
    return (
      <div className="absolute right-4 bottom-4 w-28 h-28 opacity-10 flex gap-2 items-center justify-center pointer-events-none">
        <div className="w-16 h-16 rounded-full border-4 border-[#7C3AED] animate-pulse-slow" />
        <div className="w-10 h-10 rounded-full border-4 border-[#7C3AED] absolute" />
      </div>
    );
  }
  if (pattern === 'grid') {
    return (
      <div className="absolute right-4 bottom-4 w-20 h-20 opacity-[0.08] grid grid-cols-3 gap-2 pointer-events-none">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="bg-[#06B6D4] rounded-sm" />
        ))}
      </div>
    );
  }
  if (pattern === 'bars') {
    return (
      <div className="absolute right-6 bottom-4 w-16 h-12 opacity-10 flex items-end gap-1.5 pointer-events-none">
        <div className="w-2.5 h-[30%] bg-amber-400 rounded-sm" />
        <div className="w-2.5 h-[60%] bg-amber-400 rounded-sm animate-pulse" />
        <div className="w-2.5 h-[90%] bg-amber-400 rounded-sm" />
      </div>
    );
  }
  if (pattern === 'wave') {
    return (
      <div className="absolute right-6 bottom-4 w-24 h-12 opacity-10 flex gap-1.5 items-center justify-center pointer-events-none">
        <svg viewBox="0 0 100 30" className="w-full h-full stroke-pink-400 stroke-[4] fill-none">
          <path d="M0,15 Q25,0 50,15 T100,15" className="animate-float" />
        </svg>
      </div>
    );
  }
  if (pattern === 'dots') {
    return (
      <div className="absolute right-6 bottom-6 w-20 h-12 opacity-[0.09] flex flex-wrap gap-2 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-purple-400" />
        ))}
      </div>
    );
  }
  return (
    <div className="absolute right-4 bottom-4 w-16 h-16 opacity-[0.09] flex items-center justify-center pointer-events-none">
      <GitBranch size={48} className="text-indigo-400" />
    </div>
  );
}

export default function WhatIBuild() {

  return (
    <div>
      <AnimatedSection>
        <SectionHeading
          label="02 / Capabilities"
          title="What I Build"
          subtitle="Real-world engineering solutions focused on product performance, usability, and architecture"
        />
      </AnimatedSection>

      {/* Alternating CSS Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {capabilities.map((cap, i) => {
          const Icon = cap.icon;
          return (
            <AnimatedSection key={cap.title} delay={i * 100} className={cap.span}>
              <TiltCard maxTilt={5} className="h-full">
                <div className="group glass-card rounded-3xl p-6 lg:p-8 h-full flex flex-col justify-between relative overflow-hidden">
                  {/* Visual Accent Decoration */}
                  <CapabilityVisualDecoration pattern={cap.visualPattern} />

                  <div>
                    {/* Card Icon & Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${cap.bgColor}`}>
                        <Icon size={22} className={cap.color} />
                      </div>
                      <ArrowUpRight size={16} className="text-slate-500 group-hover:text-slate-350 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-display text-xl font-bold text-slate-100 mb-2 group-hover:text-[#7C3AED] transition-colors duration-300">
                      {cap.title}
                    </h3>
                    <p className="text-slate-350 text-sm leading-relaxed mb-6 font-sans">
                      {cap.description}
                    </p>
                  </div>

                  {/* Tech tags and metrics bottom row */}
                  <div className="space-y-4 pt-4 border-t border-white/5 z-10">
                    {/* Subtle Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {cap.tech.map(t => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium
                            bg-white/5 text-slate-300 border border-white/10 transition-all duration-300 hover:border-[#7C3AED]/30 hover:bg-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Impact Metric Block */}
                    <div className="flex gap-2 items-start bg-slate-950/40 border border-white/10 p-3 rounded-xl">
                      <CheckCircle2 size={14} className="text-[#06B6D4] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider font-semibold leading-none mb-1">Impact & Outcome</p>
                        <p className="text-slate-300 text-[11px] leading-normal font-sans font-medium">
                          {cap.metric}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
}
