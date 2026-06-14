import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection from './ui/AnimatedSection';
import Badge from './ui/Badge';
import { skills } from '../data/portfolio';

const categoryIcons: Record<string, string> = {
  'Languages': '{ }',
  'Frameworks & Libraries': '</>',
  'Databases & Cloud': '☁',
  'Tools & Practices': '⚙',
};

const familiarWith = ['React Native', 'Flutter', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'Android Studio', 'Vercel'];

export default function Skills() {
  const prefersReduced = useReducedMotion();

  return (
    <div>
      <AnimatedSection>
        <SectionHeading
          label="02 / Skills"
          title="Tech Stack"
          subtitle="Technologies and tools I work with day to day"
        />
      </AnimatedSection>

      {/* Skill Category Cards */}
      <div className="grid sm:grid-cols-2 gap-5 mb-14">
        {Object.entries(skills).map(([category, items], i) => (
          <AnimatedSection key={category} delay={i * 100}>
            <motion.div
              whileHover={prefersReduced ? {} : { y: -4 }}
              className="bg-surface border border-border rounded-xl p-6
                hover:border-accent/40 transition-all duration-300
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] h-full"
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-xl text-accent opacity-70 w-8 text-center">
                  {categoryIcons[category] ?? '#'}
                </span>
                <span className="font-mono text-sm text-accent tracking-wider uppercase">
                  {category}
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {items.map(skill => (
                  <Badge key={skill} label={skill} />
                ))}
              </div>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>

      {/* Familiar With Section */}
      <AnimatedSection delay={400}>
        <div className="border-t border-border/50 pt-10">
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-5">
            Also Familiar With
          </p>
          <div className="flex flex-wrap gap-3">
            {familiarWith.map((tech, i) => (
              <motion.span
                key={tech}
                initial={prefersReduced ? {} : { opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                viewport={{ once: true }}
                className="px-4 py-2 rounded-full text-sm font-mono text-textSoft
                  border border-border hover:border-accent/40 hover:text-accent
                  bg-surface/50 transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
