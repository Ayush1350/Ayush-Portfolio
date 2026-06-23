import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Code2, Download, Award } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection from './ui/AnimatedSection';
import { personalInfo } from '../data/portfolio';
import AnimatedCounter from './ui/AnimatedCounter';
import TiltCard from './ui/TiltCard';

const stats = [
  { value: '2+ yrs', label: 'Professional\nExperience' },
  { value: '7+ apps', label: 'Production Projects\nDelivered' },
  { value: '10+ tech', label: 'Core Skills\nMastered' },
  { value: '5+ domains', label: 'Business Domains\nServed' },
];

const achievements = [
  'Architected frontend for multi-tenant enterprise SaaS systems serving thousands of users.',
  'Accelerated product dev cycles by 40% through AI-augmented workflows and automated agents.',
  'Achieved 100% type-safety in next-gen media dashboards, drastically cutting production runtime bugs.'
];

export default function About() {
  const prefersReduced = useReducedMotion();

  return (
    <div>
      <AnimatedSection>
        <SectionHeading
          label="01 / About Me"
          title="Who I Am"
          subtitle="A summary of my background, capabilities, and professional approach"
        />
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left — Bio */}
        <AnimatedSection delay={150}>
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-100 tracking-tight leading-tight">
              Building high-performance interfaces that bridge code and <span className="gradient-text">creativity</span>.
            </h3>
            <p className="text-slate-350 text-base md:text-lg leading-relaxed font-sans">
              I am a results-driven Frontend and Mobile Engineer with over 2 years of professional experience building scalable SaaS platforms and business management applications. By leveraging a type-safe stack based on <span className="text-[#06B6D4] font-semibold">Next.js, React.js, and TypeScript</span>, I deliver production-grade applications that perform.
            </p>
            <p className="text-slate-350 text-base md:text-lg leading-relaxed font-sans">
              I thrive in agile startup environments where code quality, user experience, and delivery speed are critical. I actively embed AI Agents and Copilot systems directly into my development cycle, maintaining a high standard of velocity and stability.
            </p>

            {/* Achievements */}
            <div className="space-y-3 pt-2">
              <h4 className="font-display font-bold text-slate-400 text-xs uppercase tracking-widest">Key Achievements</h4>
              {achievements.map((ach, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <div className="w-5 h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award size={12} className="text-[#06B6D4]" />
                  </div>
                  <span className="text-slate-350 text-sm leading-relaxed">{ach}</span>
                </div>
              ))}
            </div>

            {/* Location & CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={12} className="text-[#7C3AED]" />
                </div>
                <span className="font-mono text-sm text-slate-300 font-medium">{personalInfo.location}</span>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="/Ayush_Resume_Software_Developer.pdf"
                download="Ayush_Resume_Software_Developer.pdf"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm
                  hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
              >
                <Download size={14} className="group-hover:translate-y-0.5 transition-transform duration-300" />
                Download Resume
              </a>
            </div>
          </div>
        </AnimatedSection>

        {/* Right — Stats & Sub-interests */}
        <AnimatedSection delay={250}>
          <div className="grid grid-cols-2 gap-4 lg:gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.value}
                initial={prefersReduced ? {} : { opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 + 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                viewport={{ once: true }}
                className="h-full"
              >
                <TiltCard maxTilt={15} className="h-full">
                  <div className="glass-card rounded-2xl p-6 flex flex-col items-start relative overflow-hidden group h-full">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#7C3AED]/5 to-[#06B6D4]/5 rounded-full blur-xl" />
                    <span className="font-display text-3xl lg:text-4xl font-black text-slate-100 group-hover:text-[#06B6D4] transition-colors duration-300 mb-2 leading-none">
                      <AnimatedCounter value={stat.value} />
                    </span>
                    <span className="font-mono text-[10px] lg:text-xs text-slate-400 uppercase tracking-wider whitespace-pre-line leading-relaxed">
                      {stat.label}
                    </span>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* Extra info card */}
          <TiltCard maxTilt={6} className="mt-6">
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#06B6D4]/5 to-transparent rounded-full blur-xl" />
              <div className="flex items-center gap-2 mb-4">
                <Code2 size={14} className="text-[#06B6D4]" />
                <p className="font-mono text-xs text-slate-400 uppercase tracking-widest font-semibold">Additional Capabilities</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['React Native', 'Flutter', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'REST APIs', 'Redux.js'].map(t => (
                  <span key={t} className="px-3 py-1.5 rounded-xl text-xs font-mono
                    bg-white/5 text-slate-300 border border-white/10 hover:border-[#7C3AED]/40 hover:bg-[#7C3AED]/10 transition-all duration-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </TiltCard>
        </AnimatedSection>
      </div>
    </div>
  );
}
