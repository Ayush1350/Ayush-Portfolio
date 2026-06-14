import { motion, useReducedMotion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection from './ui/AnimatedSection';
import { personalInfo } from '../data/portfolio';

const stats = [
  { value: '2+', label: 'Years\nExperience' },
  { value: '7+', label: 'Projects\nDelivered' },
  { value: '10+', label: 'Tech Skills\nMastered' },
  { value: '5+', label: 'Domains\nServed' },
];

export default function About() {
  const prefersReduced = useReducedMotion();

  return (
    <div>
      {/* Availability badge */}
      <AnimatedSection>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
          bg-emerald-500/10 border border-emerald-500/20 mb-10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
          <span className="text-emerald-400 text-sm font-mono">
            Currently at Lamda Logs · Full-time · Ahmedabad
          </span>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <SectionHeading
          label="01 / About Me"
          title="Who I Am"
          subtitle="A brief introduction"
        />
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left — Bio */}
        <AnimatedSection delay={200}>
          <div className="space-y-5">
            <p className="text-textSoft text-lg leading-relaxed">
              Innovative Frontend and Mobile Engineer with a proven track record of architecting
              high-performance digital solutions. By combining deep expertise in{' '}
              <span className="text-accent font-medium">React/Next.js</span> with modern
              AI-driven development practices, I transform complex product visions into
              intuitive, user-centric applications.
            </p>
            <p className="text-textSoft text-lg leading-relaxed">
              I thrive in agile environments, prioritizing code quality, performance optimization,
              and the rapid delivery of features that elevate the end-user experience. Whether
              it's a multi-tenant SaaS platform or a mobile app with real-world social impact,
              I bring the same depth of care to every project.
            </p>
            <p className="text-textSoft text-lg leading-relaxed">
              My edge: I actively embed{' '}
              <span className="text-accent font-medium">AI Agents & GitHub Copilot</span>{' '}
              into daily workflows, staying ahead of the curve in developer productivity.
            </p>

            {/* Location chip */}
            <div className="flex items-center gap-2 pt-2">
              <MapPin size={14} className="text-accent" />
              <span className="font-mono text-sm text-textSoft">{personalInfo.location}</span>
            </div>

            {/* Summary quote */}
            <div className="mt-6 pl-4 border-l-2 border-accent/40">
              <p className="text-textSoft italic text-sm leading-relaxed">
                "{personalInfo.summary.trim()}"
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Right — Stats */}
        <AnimatedSection delay={350}>
          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.value}
                initial={prefersReduced ? {} : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-surface border border-border rounded-2xl p-6
                  hover:border-accent/30 hover:-translate-y-1 transition-all duration-300
                  flex flex-col items-start"
              >
                <span className="font-mono text-4xl font-bold text-accent mb-2 leading-none">
                  {stat.value}
                </span>
                <span className="font-mono text-xs text-textSoft uppercase tracking-wider whitespace-pre-line leading-relaxed">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Extra info card */}
          <div className="mt-5 bg-surface border border-border rounded-2xl p-6
            hover:border-accent/30 transition-all duration-300">
            <p className="font-mono text-xs text-muted uppercase tracking-widest mb-3">Also experienced in</p>
            <div className="flex flex-wrap gap-2">
              {['React Native', 'Flutter', 'Node.js', 'Express.js', 'MongoDB', 'Firebase'].map(t => (
                <span key={t} className="px-3 py-1 rounded-md text-xs font-mono
                  bg-accent/10 text-accent border border-accent/20">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
