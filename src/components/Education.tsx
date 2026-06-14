import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, Award, MapPin, Calendar, Star } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection from './ui/AnimatedSection';
import { education, certifications } from '../data/portfolio';

const issuerColors: Record<string, string> = {
  'HackerRank': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  'Cisco': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  'Great Learning': 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  'TCS': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
};

export default function Education() {
  const prefersReduced = useReducedMotion();

  return (
    <div>
      <AnimatedSection>
        <SectionHeading
          label="05 / Education"
          title="Academic Background"
          subtitle="Where the engineering foundation was laid"
        />
      </AnimatedSection>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Education Card */}
        <AnimatedSection delay={100}>
          <motion.div
            whileHover={prefersReduced ? {} : { y: -4 }}
            className="bg-surface border border-border rounded-2xl p-8
              hover:border-accent/40 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]
              transition-all duration-300 h-full"
          >
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20
                flex items-center justify-center flex-shrink-0">
                <GraduationCap size={22} className="text-accent" />
              </div>
              <div>
                <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-1">
                  Bachelor of Technology
                </span>
                <h3 className="text-xl font-bold text-text leading-tight">
                  Computer Engineering
                </h3>
              </div>
            </div>

            {/* Institution */}
            <div className="mb-6 pl-4 border-l-2 border-accent/30">
              <p className="text-text font-semibold mb-1">{education.institution}</p>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-bg/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-muted text-xs font-mono uppercase tracking-wider mb-2">
                  <Calendar size={12} /> Duration
                </div>
                <p className="text-text text-sm font-medium">{education.period}</p>
              </div>
              <div className="bg-bg/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-muted text-xs font-mono uppercase tracking-wider mb-2">
                  <Star size={12} /> CGPA
                </div>
                <p className="text-accent text-2xl font-bold font-mono">{education.cgpa}</p>
              </div>
              <div className="bg-bg/50 rounded-xl p-4 col-span-2">
                <div className="flex items-center gap-2 text-muted text-xs font-mono uppercase tracking-wider mb-2">
                  <MapPin size={12} /> Location
                </div>
                <p className="text-text text-sm font-medium">{education.location}</p>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Certifications */}
        <AnimatedSection delay={250}>
          <div className="h-full">
            <p className="font-mono text-xs text-accent uppercase tracking-widest mb-5">
              Certifications & Achievements
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  viewport={{ once: true }}
                  whileHover={prefersReduced ? {} : { scale: 1.02 }}
                  className="bg-surface border border-border rounded-xl p-4
                    hover:border-accent/30 transition-all duration-200 flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award size={14} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-text text-sm font-medium leading-snug mb-1">{cert.name}</p>
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                      issuerColors[cert.issuer] ?? 'text-textSoft bg-surface border-border'
                    }`}>
                      {cert.issuer}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
