import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, MapPin } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection from './ui/AnimatedSection';
import { experiences } from '../data/portfolio';

export default function Experience() {
  const prefersReduced = useReducedMotion();

  return (
    <div>
      <AnimatedSection>
        <SectionHeading
          label="03 / Experience"
          title="Work History"
          subtitle="Where I've built things that matter"
        />
      </AnimatedSection>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent" />

        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <AnimatedSection key={i} delay={i * 150}>
              <div className="relative flex gap-8 md:gap-12">
                {/* Timeline dot */}
                <div className="relative flex-shrink-0 flex flex-col items-center">
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-accent ring-4 ring-accent/20
                    shadow-[0_0_15px_rgba(56,189,248,0.5)] mt-6 z-10" />
                </div>

                {/* Card */}
                <motion.div
                  initial={prefersReduced ? {} : { opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-1 bg-surface border border-border rounded-2xl p-6 md:p-8
                    hover:border-accent/40 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]
                    transition-all duration-300 mb-2"
                >
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-xl font-bold text-text mb-1">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-accent font-medium">
                        <Briefcase size={14} />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:text-right">
                      <span className="font-mono text-xs text-accent bg-accent/10 border border-accent/20
                        px-3 py-1 rounded-full whitespace-nowrap">
                        {exp.period}
                      </span>
                      <span className="font-mono text-xs text-muted bg-surface border border-border
                        px-3 py-1 rounded-full">
                        {exp.duration}
                      </span>
                      <span className={`font-mono text-xs px-3 py-1 rounded-full border ${
                        exp.type === 'Full-time'
                          ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                          : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                      }`}>
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-muted font-mono text-xs mb-5">
                    <MapPin size={12} />
                    <span>{exp.location}</span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-3">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-3 text-textSoft text-sm leading-relaxed">
                        <span className="text-accent mt-1.5 flex-shrink-0 text-xs">▸</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </AnimatedSection>
          ))}

          {/* End dot */}
          <div className="relative flex gap-8 md:gap-12">
            <div className="flex-shrink-0 flex items-center justify-center w-4 md:w-5">
              <div className="w-3 h-3 rounded-full bg-border ring-2 ring-border/50" />
            </div>
            <div className="flex items-center">
              <span className="font-mono text-xs text-muted italic">The journey continues…</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
