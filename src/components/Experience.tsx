import { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection from './ui/AnimatedSection';
import { experiences } from '../data/portfolio';
import TiltCard from './ui/TiltCard';

export default function Experience() {
  const prefersReduced = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of this specific timeline container
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 65%', 'end 70%'],
  });

  // Smooth out progress values
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <div>
      <AnimatedSection>
        <SectionHeading
          label="03 / Experience"
          title="Work History"
          subtitle="Where I've built SaaS modules, dashboards, and scalable applications"
        />
      </AnimatedSection>

      {/* Timeline Container */}
      <div ref={timelineRef} className="relative">
        {/* Empty timeline vertical line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-white/5" />

        {/* Animated timeline progress line */}
        <motion.div
          style={{ scaleY, transformOrigin: 'top' }}
          className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#7C3AED] via-[#06B6D4] to-[#22C55E]"
        />

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="relative flex gap-8 md:gap-12">
                {/* Timeline dot */}
                <div className="relative flex-shrink-0 flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full bg-[#7C3AED] border-4 border-[#0F172A]
                    shadow-[0_0_12px_rgba(124,58,237,0.6)] mt-8 z-10 animate-pulse" />
                </div>

                {/* Experience Card wrapped in TiltCard */}
                <TiltCard maxTilt={4} className="flex-1">
                  <motion.div
                    initial={prefersReduced ? {} : { opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    viewport={{ once: true }}
                    className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden group h-full"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#7C3AED]/5 to-[#06B6D4]/5 rounded-full blur-xl" />

                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-xl md:text-2xl font-display font-bold text-slate-100 mb-1 group-hover:text-[#7C3AED] transition-colors duration-300">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-[#06B6D4] font-mono text-sm font-semibold">
                          <Briefcase size={13} />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      
                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2 sm:text-right">
                        <span className="font-mono text-[10px] text-[#7C3AED] bg-white/5 border border-white/10
                          px-3 py-1 rounded-lg uppercase tracking-wider font-semibold">
                          {exp.period}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400 bg-white/5 border border-white/10
                          px-3 py-1 rounded-lg flex items-center gap-1">
                          <Clock size={10} />
                          {exp.duration}
                        </span>
                        <span className={`font-mono text-[10px] px-3 py-1 rounded-lg border uppercase tracking-wider font-semibold ${
                          exp.type === 'Full-time'
                             ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                             : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                        }`}>
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-slate-500 font-mono text-xs mb-6">
                      <MapPin size={12} className="text-slate-500" />
                      <span>{exp.location}</span>
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-4">
                      {exp.bullets.map((bullet, j) => (
                        <li key={j} className="flex gap-3 text-slate-350 text-sm md:text-base leading-relaxed">
                          <span className="text-[#7C3AED] flex-shrink-0 text-sm mt-1.5 select-none font-bold">▸</span>
                          <span className="font-sans text-slate-300">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </TiltCard>
              </div>
            </AnimatedSection>
          ))}

          {/* End dot */}
          <div className="relative flex gap-8 md:gap-12">
            <div className="flex-shrink-0 flex items-center justify-center w-5">
              <div className="w-3 h-3 rounded-full bg-slate-800 border border-slate-700" />
            </div>
            <div className="flex items-center">
              <span className="font-mono text-xs text-slate-500 italic">The journey continues…</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
