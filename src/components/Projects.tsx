import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Building2,
  Calendar,
  FolderGit2,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import AnimatedSection from './ui/AnimatedSection'
import { projects } from '../data/portfolio'
import TiltCard from './ui/TiltCard'
import { GithubIcon } from './ui/SocialIcons'

const filterCategories = [
  'All',
  'SaaS',
  'Dashboard',
  'Mobile',
  'Full-Stack',
  'Ed-Tech',
]

// Interactive mockups rendering for SaaS/Dashboard elements inside dark glass
function ProjectVisualMockup({
  category,
  name,
}: {
  category: string
  name: string
}) {
  if (category === 'SaaS' || name === 'Flipspaces') {
    return (
      <div className="h-32 w-full bg-slate-950/40 border border-white/10 rounded-2xl overflow-hidden flex flex-col p-2.5 select-none backdrop-blur-md relative group-hover:border-white/20 transition-colors duration-300">
        {/* Browser header */}
        <div className="flex items-center gap-1.5 pb-2 border-b border-white/5 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
          <div className="h-3 bg-white/5 rounded px-2 w-32 ml-2 flex items-center">
            <div className="w-full h-0.5 bg-white/10 rounded-[2px]" />
          </div>
        </div>
        {/* SaaS Workspace */}
        <div className="flex flex-1 gap-2">
          {/* Sidebar */}
          <div className="w-8 bg-white/5 rounded-lg p-1 flex flex-col gap-1 transition-all duration-300 group-hover:bg-white/10">
            <div className="h-2 bg-[#7C3AED]/20 rounded w-full" />
            <div className="h-1 bg-white/10 rounded w-4" />
            <div className="h-1 bg-white/10 rounded w-5" />
            <div className="h-1 bg-white/10 rounded w-3" />
          </div>
          {/* Content */}
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <div className="h-3 bg-[#7C3AED]/10 rounded w-16" />
              <div className="h-2 bg-white/10 rounded w-8" />
            </div>
            <div className="grid grid-cols-3 gap-1">
              <div className="h-12 bg-white/5 border border-white/5 rounded p-1 flex flex-col justify-between transition-all duration-300 group-hover:bg-white/10 group-hover:scale-[1.03]">
                <div className="h-1.5 bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-[#06B6D4]/20 rounded mt-auto" />
              </div>
              <div className="h-12 bg-white/5 border border-white/5 rounded p-1 flex flex-col justify-between transition-all duration-300 group-hover:bg-white/10 group-hover:scale-[1.03]">
                <div className="h-1.5 bg-white/10 rounded w-2/3" />
                <div className="h-3 bg-[#7C3AED]/20 rounded mt-auto" />
              </div>
              <div className="h-12 bg-white/5 border border-white/5 rounded p-1 flex flex-col justify-between transition-all duration-300 group-hover:bg-white/10 group-hover:scale-[1.03]">
                <div className="h-1.5 bg-white/10 rounded w-4/5" />
                <div className="h-3 bg-[#22C55E]/20 rounded mt-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (category === 'Dashboard') {
    return (
      <div className="h-32 w-full bg-slate-950/40 border border-white/10 rounded-2xl overflow-hidden flex flex-col p-2.5 select-none backdrop-blur-md group-hover:border-white/20 transition-colors duration-300">
        {/* Top Activity Header */}
        <div className="flex justify-between items-center pb-2 border-b border-white/5 mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded bg-[#7C3AED]" />
            <div className="h-2.5 bg-white/15 rounded w-20" />
          </div>
          <div className="h-2 bg-emerald-500/20 text-emerald-400 rounded px-1.5 py-0.5 flex items-center text-[7px] font-bold">
            ACTIVE
          </div>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 flex-1">
          <div className="bg-white/5 border border-white/5 rounded-lg p-2 flex flex-col justify-between transition-all duration-300 group-hover:bg-white/10">
            <div className="h-1.5 bg-white/15 rounded w-10" />
            <div className="h-4 bg-[#7C3AED]/10 rounded w-16" />
            <div className="h-1 bg-white/5 rounded w-3/4" />
          </div>
          {/* Chart representation */}
          <div className="bg-white/5 border border-white/5 rounded-lg p-2 flex flex-col justify-between overflow-hidden transition-all duration-300 group-hover:bg-white/10">
            <div className="h-1.5 bg-white/15 rounded w-14" />
            <div className="flex items-end gap-1.5 h-10 pt-2">
              <div className="w-full h-4 bg-white/10 rounded-sm" />
              <div className="w-full h-7 bg-white/10 rounded-sm" />
              <div className="w-full h-5 bg-[#06B6D4]/30 rounded-sm group-hover:h-8 transition-all duration-500" />
              <div className="w-full h-9 bg-[#7C3AED]/40 rounded-sm group-hover:h-6 transition-all duration-500" />
              <div className="w-full h-6 bg-white/10 rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (category === 'Mobile') {
    return (
      <div className="h-32 w-full bg-slate-950/40 border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center p-2 select-none backdrop-blur-md group-hover:border-white/20 transition-colors duration-300">
        {/* Mobile device Mockup */}
        <div className="w-20 h-28 bg-slate-900 rounded-xl p-1 flex flex-col shadow-md border border-white/10 transition-transform duration-300 group-hover:scale-[1.05] group-hover:rotate-1">
          {/* Speaker/Camera bar */}
          <div className="w-6 h-0.5 bg-slate-800 rounded-full mx-auto mb-1" />
          {/* App screen */}
          <div className="flex-1 bg-[#0F172A] rounded-lg p-1 flex flex-col gap-1 overflow-hidden">
            <div className="h-2 bg-[#7C3AED]/10 rounded w-full flex items-center px-1">
              <div className="w-4 h-0.5 bg-[#7C3AED]/40 rounded" />
            </div>
            <div className="w-full h-8 bg-white/5 rounded-md border border-white/5 p-0.5 flex flex-col justify-between">
              <div className="w-full h-0.5 bg-white/10 rounded" />
              <div className="w-1/2 h-1 bg-[#7C3AED]/40 rounded" />
            </div>
            <div className="w-full h-8 bg-white/5 rounded-md border border-white/5 p-0.5 flex flex-col justify-between">
              <div className="w-full h-0.5 bg-white/10 rounded" />
              <div className="w-2/3 h-1 bg-[#06B6D4]/40 rounded" />
            </div>
            {/* Nav bar */}
            <div className="h-2 bg-white/5 rounded-sm mt-auto flex justify-around items-center">
              <div className="w-1 h-1 rounded-full bg-[#7C3AED]" />
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <div className="w-1 h-1 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default Full-Stack or Ed-Tech mockup
  return (
    <div className="h-32 w-full bg-slate-950/40 border border-white/10 rounded-2xl overflow-hidden flex flex-col p-2.5 select-none backdrop-blur-md group-hover:border-white/20 transition-colors duration-300">
      {/* Web mockup */}
      <div className="flex items-center justify-between pb-1.5 border-b border-white/5 mb-1.5">
        <div className="flex gap-0.5">
          <div className="w-1 h-1 rounded-full bg-white/10" />
          <div className="w-1 h-1 rounded-full bg-white/10" />
          <div className="w-1 h-1 rounded-full bg-white/10" />
        </div>
        <div className="h-2 bg-[#7C3AED]/10 rounded w-16" />
      </div>
      <div className="flex-1 grid grid-cols-3 gap-2 items-center">
        <div className="col-span-2 flex flex-col gap-1.5">
          <div className="h-2 bg-white/15 rounded w-full" />
          <div className="h-2 bg-white/10 rounded w-3/4" />
          <div className="h-3 bg-[#7C3AED]/20 rounded w-12 group-hover:w-16 transition-all duration-300" />
        </div>
        <div className="h-16 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-[#7C3AED]/10 group-hover:rotate-6">
          <FolderGit2 size={16} className="text-[#7C3AED]" />
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [showToast, setShowToast] = useState(false)
  const prefersReduced = useReducedMotion()

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  const handleDemoClick = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div>
      <AnimatedSection>
        <SectionHeading
          label="04 / Projects"
          title="Featured Projects"
          subtitle="A selection of high-end enterprise SaaS modules, dashboards, and mobile apps"
        />
      </AnimatedSection>

      {/* Toast Notification */}
      <div className={`toast ${showToast ? 'show' : ''}`}>
        ✓ Contact me directly for a secure, live walk-through demo!
      </div>

      {/* Filter bar */}
      <AnimatedSection delay={100}>
        <div className="flex flex-wrap gap-2 mb-10 bg-white/5 border border-white/10 p-1.5 rounded-2xl max-w-max backdrop-blur-md">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`relative px-4 py-2 rounded-xl text-xs md:text-sm font-mono transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? 'text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {activeFilter === cat && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-xl -z-10 shadow-lg shadow-[#7C3AED]/20"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* Project Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.name}
              layout
              initial={prefersReduced ? {} : { opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{
                duration: 0.5,
                delay: i * 0.04,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              className="h-full"
            >
              <TiltCard maxTilt={5} className="h-full">
                <div className="glass-card rounded-3xl p-5 transition-all duration-300 flex flex-col group cursor-default relative overflow-hidden h-full">
                  {/* Category & Period row */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-mono text-[9px] text-[#7C3AED] bg-white/5 border border-white/10
                      px-2.5 py-1 rounded-lg uppercase tracking-wider font-semibold"
                    >
                      {project.category}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 flex items-center gap-1.5">
                      <Calendar size={11} className="text-slate-500" />
                      {project.period}
                    </span>
                  </div>

                  {/* Visual SaaS Mockup */}
                  <div className="mb-4">
                    <ProjectVisualMockup
                      category={project.category}
                      name={project.name}
                    />
                  </div>

                  {/* Project name */}
                  <h3 className="text-lg md:text-xl font-display font-bold text-slate-100 mb-1 group-hover:text-[#7C3AED] transition-colors duration-300 flex items-center gap-1">
                    {project.name}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-[#7C3AED]"
                    />
                  </h3>

                  {/* Company */}
                  <div className="flex items-center gap-1.5 text-slate-400 font-mono text-xs mb-3">
                    <Building2 size={12} className="text-slate-500" />
                    <span>{project.company}</span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-350 text-sm leading-relaxed mb-4 flex-1 font-sans">
                    {project.description}
                  </p>

                  {/* Highlight */}
                  {project.highlights.map((h, j) => (
                    <div
                      key={j}
                      className="flex gap-2 mb-4 bg-slate-950/20 border border-white/5 p-2.5 rounded-xl"
                    >
                      <span className="text-[#7C3AED] flex-shrink-0 text-xs mt-0.5 select-none">
                        ◆
                      </span>
                      <p className="text-slate-300 text-xs leading-relaxed font-sans">
                        {h}
                      </p>
                    </div>
                  ))}

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium
                          bg-white/5 text-slate-350 border border-white/10 transition-all duration-300 hover:border-[#7C3AED]/30 hover:bg-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Live Demo and GitHub buttons */}
                  <div className="flex gap-2.5 mt-auto pt-2 z-40">
                    <button
                      onClick={handleDemoClick}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                    >
                      <ExternalLink size={12} />
                      Live Demo
                    </button>
                    <a
                      href={`https://github.com/Ayush1350`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-xs font-semibold tracking-wide transition-all duration-300"
                    >
                      <GithubIcon size={12} />
                      GitHub Code
                    </a>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-slate-500 font-mono text-sm">
          <FolderGit2
            size={24}
            className="mx-auto mb-3 opacity-30 text-[#7C3AED]"
          />
          No projects in this category yet.
        </div>
      )}
    </div>
  )
}
