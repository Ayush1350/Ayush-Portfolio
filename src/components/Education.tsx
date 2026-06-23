import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, Award, MapPin, Calendar, Star } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection from './ui/AnimatedSection';
import { education, certifications } from '../data/portfolio';

const issuerColors: Record<string, string> = {
  'HackerRank': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40',
  'Cisco': 'text-blue-400 bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40',
  'Great Learning': 'text-orange-400 bg-orange-500/10 border-orange-500/20 hover:border-orange-500/40',
  'TCS': 'text-purple-400 bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40',
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

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Education Card */}
        <AnimatedSection delay={100}>
          <motion.div
            whileHover={prefersReduced ? {} : { y: -4 }}
            className="glass-card rounded-3xl p-8 transition-all duration-300 h-full relative overflow-hidden group cursor-default"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/5 to-accent-purple/5 rounded-full blur-2xl" />

            {/* Header */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20
                flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <GraduationCap size={22} className="text-accent" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-1 font-semibold">
                  Bachelor of Technology
                </span>
                <h3 className="text-xl md:text-2xl font-display font-bold text-white leading-tight">
                  Computer Engineering
                </h3>
              </div>
            </div>

            {/* Institution */}
            <div className="mb-8 pl-4 border-l-2 border-accent-purple/40">
              <p className="text-white font-semibold text-lg mb-1 leading-snug">{education.institution}</p>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 group-hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 text-textSoft text-[10px] font-mono uppercase tracking-wider mb-2">
                  <Calendar size={12} className="text-accent" /> Duration
                </div>
                <p className="text-white text-sm font-medium font-mono">{education.period}</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 group-hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 text-textSoft text-[10px] font-mono uppercase tracking-wider mb-2">
                  <Star size={12} className="text-accent-purple" /> CGPA
                </div>
                <p className="text-accent text-2xl font-black font-mono">{education.cgpa}</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 col-span-2 group-hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 text-textSoft text-[10px] font-mono uppercase tracking-wider mb-2">
                  <MapPin size={12} className="text-accent-pink" /> Location
                </div>
                <p className="text-white text-sm font-medium font-mono">{education.location}</p>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Certifications */}
        <AnimatedSection delay={250}>
          <div className="h-full flex flex-col justify-between">
            <p className="font-mono text-xs text-textSoft uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
              Certifications & Achievements
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={prefersReduced ? {} : { scale: 1.02, y: -2 }}
                  className="glass-card rounded-2xl p-4.5 transition-all duration-300 flex items-start gap-3.5 relative overflow-hidden"
                >
                  <div className="w-9 h-9 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award size={15} className="text-accent-purple" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold leading-snug mb-1.5 truncate" title={cert.name}>
                      {cert.name}
                    </p>
                    <span className={`font-mono text-[9px] px-2 py-0.5 rounded-md border inline-block ${
                      issuerColors[cert.issuer] ?? 'text-textSoft bg-white/5 border-white/10'
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
