import { Monitor, Cpu, Sparkles, Zap, Smartphone } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection from './ui/AnimatedSection';
import TiltCard from './ui/TiltCard';

const serviceList = [
  {
    title: 'SaaS Web Development',
    desc: 'Creating robust enterprise web modules, portals, and data management systems centered around security and accessibility.',
    icon: Monitor,
    color: 'text-[#7C3AED]',
    bgColor: 'bg-[#7C3AED]/10',
  },
  {
    title: 'Custom Mobile Engineering',
    desc: 'Deploying fluid hybrid application structures that translate seamlessly across iOS and Android device screen sizes.',
    icon: Smartphone,
    color: 'text-[#06B6D4]',
    bgColor: 'bg-[#06B6D4]/10',
  },
  {
    title: 'State & API Architecting',
    desc: 'Structuring unified frontend databases with global caching, clean cache invalidation, and custom hook integrations.',
    icon: Cpu,
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/10',
  },
  {
    title: 'Design-to-Code Engineering',
    desc: 'Standardizing user interfaces into reusable Tailwind components, ensuring absolute parity with Figma layouts.',
    icon: Sparkles,
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/10',
  },
  {
    title: 'Site Speed & Audits',
    desc: 'Refining code compilation trees, compressing assets, configuring cache headers, and fixing layout shifts.',
    icon: Zap,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
  },
];

export default function Services() {

  return (
    <div>
      <AnimatedSection>
        <SectionHeading
          label="05 / Services"
          title="What I Offer"
          subtitle="Specialized services designed to build high-performance products and streamline workflows"
        />
      </AnimatedSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {serviceList.map((svc, i) => {
          const Icon = svc.icon;
          return (
            <AnimatedSection key={svc.title} delay={i * 100}>
              <TiltCard maxTilt={6} className="h-full">
                <div className="group glass-card rounded-3xl p-6 lg:p-8 h-full flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#7C3AED]/5 to-transparent rounded-full blur-xl pointer-events-none" />

                  <div>
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${svc.bgColor}`}>
                      <Icon size={22} className={svc.color} />
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg font-bold text-slate-100 mb-2 group-hover:text-[#7C3AED] transition-colors duration-300">
                      {svc.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-350 text-sm leading-relaxed font-sans">
                      {svc.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-white/5 flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#7C3AED] transition-colors">
                    <span>Learn more</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
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
