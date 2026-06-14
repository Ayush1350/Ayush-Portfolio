import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Building2, Calendar } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection from './ui/AnimatedSection';
import Badge from './ui/Badge';
import { projects } from '../data/portfolio';

const filterCategories = ['All', 'SaaS', 'Dashboard', 'Mobile', 'Full-Stack', 'Ed-Tech'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const prefersReduced = useReducedMotion();

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div>
      <AnimatedSection>
        <SectionHeading
          label="04 / Projects"
          title="What I've Built"
          subtitle="A selection of projects across SaaS, dashboards, and mobile"
        />
      </AnimatedSection>

      {/* Filter bar */}
      <AnimatedSection delay={100}>
        <div className="flex flex-wrap gap-2 mb-10">
          {filterCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-200 border ${
                activeFilter === cat
                  ? 'bg-accent text-bg border-accent font-semibold shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                  : 'border-border text-textSoft hover:border-accent/40 hover:text-accent bg-surface/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* Project Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.name}
              layout
              initial={prefersReduced ? {} : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={prefersReduced ? {} : { scale: 1.02, y: -4 }}
              className="bg-surface border border-border rounded-xl p-5
                hover:border-accent/40 hover:shadow-[0_8px_40px_rgba(0,0,0,0.35)]
                transition-all duration-300 flex flex-col group cursor-default"
            >
              {/* Category & period row */}
              <div className="flex items-start justify-between mb-4">
                <span className="font-mono text-[10px] text-accent bg-accent/10 border border-accent/20
                  px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="font-mono text-[10px] text-muted flex items-center gap-1">
                  <Calendar size={10} />
                  {project.period}
                </span>
              </div>

              {/* Project name */}
              <h3 className="text-lg font-bold text-text mb-1 group-hover:text-accent transition-colors duration-200">
                {project.name}
              </h3>

              {/* Company */}
              <div className="flex items-center gap-1.5 text-muted font-mono text-xs mb-3">
                <Building2 size={11} />
                <span>{project.company}</span>
              </div>

              {/* Description */}
              <p className="text-textSoft text-sm leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              {/* Highlight */}
              {project.highlights.map((h, j) => (
                <div key={j} className="flex gap-2 mb-4">
                  <span className="text-accent flex-shrink-0 text-sm mt-0.5">◆</span>
                  <p className="text-textSoft text-xs leading-relaxed">{h}</p>
                </div>
              ))}

              {/* Tech badges */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
                {project.tech.map(t => (
                  <Badge key={t} label={t} />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted font-mono">
          No projects in this category yet.
        </div>
      )}
    </div>
  );
}
