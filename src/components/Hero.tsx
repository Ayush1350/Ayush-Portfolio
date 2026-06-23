import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download, Sparkles, Code2, Zap, Trophy, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/SocialIcons';
import { personalInfo } from '../data/portfolio';
import TiltCard from './ui/TiltCard';
import MagneticButton from './ui/MagneticButton';

const delays = [0.1, 0.2, 0.3, 0.4, 0.5];

function TypewriterEffect() {
  const words = ['SaaS Platforms', 'Web Applications', 'Mobile Interfaces', 'Design Systems'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullWord = words[currentWordIndex];
    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && currentText === currentFullWord) {
      speed = 1800; // Pause at full word
    } else if (isDeleting && currentText === '') {
      speed = 400; // Pause when empty before next word
    }

    const timer = setTimeout(() => {
      if (isDeleting) {
        setCurrentText((prev) => prev.slice(0, -1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setCurrentText((prev) => currentFullWord.slice(0, prev.length + 1));
        if (currentText === currentFullWord) {
          setIsDeleting(true);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <span className="relative">
      <span className="gradient-text">{currentText}</span>
      <span className="ml-1 w-[3px] h-[0.85em] bg-[#06B6D4] inline-block animate-blink align-middle" />
    </span>
  );
}

export default function Hero() {
  const prefersReduced = useReducedMotion();

  const makeVariant = (i: number) => ({
    hidden: { opacity: 0, y: prefersReduced ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: delays[i], ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-16 overflow-hidden">
      
      {/* Background spotlights inside section (in addition to app orbs) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="w-[500px] h-[500px] absolute -top-[100px] -right-[50px] opacity-45 blur-[130px]"
          style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.18) 0%, transparent 70%)' }}
        />
        <div
          className="w-[550px] h-[550px] absolute -bottom-[150px] -left-[100px] opacity-35 blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl w-full grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column — Text & CTAs */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Availability Badge */}
          <motion.div
            variants={makeVariant(0)}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
              bg-white/5 border border-white/10 mb-2 shadow-lg backdrop-blur-md"
          >
            <Sparkles size={12} className="text-[#06B6D4] animate-pulse" />
            <span className="text-slate-300 text-xs font-mono font-bold tracking-wide uppercase">
              Open for opportunities
            </span>
          </motion.div>

          {/* Title with Typewriter Effect */}
          <motion.h1
            variants={makeVariant(1)}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl font-display font-black leading-[1.1] tracking-tight text-slate-100 min-h-[140px] sm:min-h-[160px] md:min-h-[200px]"
          >
            Hi, I'm {personalInfo.name} <br />
            I build <br className="sm:hidden" />
            <TypewriterEffect /> <br />
            that scale and perform.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={makeVariant(2)}
            initial="hidden"
            animate="visible"
            className="text-slate-300 text-base md:text-lg max-w-xl leading-relaxed font-sans"
          >
            I am a senior frontend engineer specializing in building high-performance web products, dashboards, and mobile experiences with React, Next.js, and TypeScript.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={makeVariant(3)}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <MagneticButton
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-6 py-3.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm
                hover:shadow-[0_0_25px_rgba(124,58,237,0.45)] hover:scale-[1.02] active:scale-95
                transition-all duration-300 cursor-pointer"
            >
              View Projects
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300 ml-2" />
            </MagneticButton>
            
            <MagneticButton
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-slate-200 font-semibold text-sm
                hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-95
                backdrop-blur-md transition-all duration-300 cursor-pointer"
            >
              <MessageSquare size={14} className="text-[#06B6D4] mr-2" />
              Contact Me
            </MagneticButton>
          </motion.div>

          {/* Socials & Resume */}
          <motion.div
            variants={makeVariant(4)}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-5 pt-4"
          >
            <div className="flex items-center gap-3">
              {[
                { icon: GithubIcon, href: personalInfo.github, label: 'GitHub' },
                { icon: LinkedinIcon, href: personalInfo.linkedin, label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-400
                    hover:text-[#7C3AED] hover:border-[#7C3AED]/30 hover:bg-white/10 hover:-translate-y-0.5
                    transition-all duration-300 shadow-md backdrop-blur-md"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <span className="hidden sm:inline text-slate-700 w-px h-6"></span>
            <a
              href="/Ayush_Resume_Software_Developer.pdf"
              download="Ayush_Resume_Software_Developer.pdf"
              className="group flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-[#7C3AED] transition-colors"
            >
              <Download size={14} className="group-hover:translate-y-0.5 transition-transform duration-300" />
              Download CV
            </a>
          </motion.div>

        </div>

        {/* Right Column — Professional Illustration & Floating Cards with Tilt */}
        <div className="lg:col-span-5 relative flex justify-center">
          
          <TiltCard
            maxTilt={8}
            className="relative w-80 sm:w-96 lg:w-full max-w-[360px] aspect-square rounded-3xl bg-white/5 border border-white/12 shadow-2xl p-4 flex items-center justify-center backdrop-blur-md"
          >
            {/* Inner background decorative circles */}
            <div className="absolute inset-4 rounded-2xl border border-dashed border-white/5 pointer-events-none" />
            
            {/* Image */}
            <img
              src="/avatar.png"
              alt="Ayush Patel illustration"
              className="relative w-[92%] h-[92%] object-contain rounded-2xl animate-float"
            />

            {/* Floating Card 1: Vercel status */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -left-6 bottom-16 bg-slate-950/70 border border-white/10 rounded-2xl p-3 shadow-lg flex items-center gap-2.5 max-w-[150px] select-none backdrop-blur-md"
              style={{ transform: 'translateZ(30px)' }}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <Code2 size={16} className="text-emerald-500" />
              </div>
              <div>
                <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wide leading-none mb-0.5">Vercel Status</p>
                <p className="text-slate-100 text-xs font-bold leading-none">Deployed ✓</p>
              </div>
            </motion.div>

            {/* Floating Card 2: Performance Score */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, x: 20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="absolute -right-6 top-16 bg-slate-950/70 border border-white/10 rounded-2xl p-3 shadow-lg flex items-center gap-2.5 max-w-[150px] select-none backdrop-blur-md"
              style={{ transform: 'translateZ(40px)' }}
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <Zap size={16} className="text-[#06B6D4]" />
              </div>
              <div>
                <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wide leading-none mb-0.5">Lighthouse</p>
                <p className="text-slate-100 text-xs font-bold leading-none">98% Perf</p>
              </div>
            </motion.div>

            {/* Floating Card 3: Experience */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="absolute -bottom-4 right-12 bg-slate-950/70 border border-white/10 rounded-2xl py-2.5 px-4 shadow-lg flex items-center gap-2 select-none backdrop-blur-md"
              style={{ transform: 'translateZ(50px)' }}
            >
              <Trophy size={14} className="text-amber-500" />
              <span className="font-mono text-[10px] text-slate-200 font-bold uppercase tracking-wider">
                Senior Front-End Stack
              </span>
            </motion.div>

          </TiltCard>

        </div>

      </div>
    </section>
  );
}
