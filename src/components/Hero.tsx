import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, ChevronDown, ArrowRight, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/SocialIcons';
import { personalInfo } from '../data/portfolio';

// const TYPEWRITER_TEXT = '< Frontend & Mobile Engineer />';

const terminalLines = [
  { prompt: '$', text: 'const ayush = new Engineer({' },
  { prompt: ' ', text: '  stack: ["Next.js", "TypeScript", "React"],' },
  { prompt: ' ', text: '  ai: true, passionate: true' },
  { prompt: ' ', text: '});' },
  { prompt: '$', text: 'ayush.build("amazing products") ✓' },
];

const delays = [0.1, 0.3, 0.5, 0.7, 0.9, 1.1];

export default function Hero() {
  const prefersReduced = useReducedMotion();
  // const [typed, setTyped] = useState('');
  const [terminalLine, setTerminalLine] = useState(0);
  const [terminalText, setTerminalText] = useState('');
  const [terminalCharIdx, setTerminalCharIdx] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);

  // Typewriter effect for eyebrow
  // useEffect(() => {
  //   if (prefersReduced) { setTyped(TYPEWRITER_TEXT); return; }
  //   let i = 0;
  //   const interval = setInterval(() => {
  //     setTyped(TYPEWRITER_TEXT.slice(0, i + 1));
  //     i++;
  //     if (i >= TYPEWRITER_TEXT.length) clearInterval(interval);
  //   }, 45);
  //   return () => clearInterval(interval);
  // }, [prefersReduced]);

  // Terminal easter egg typing
  useEffect(() => {
    if (!showTerminal || prefersReduced) return;
    if (terminalLine >= terminalLines.length) return;

    const currentLine = terminalLines[terminalLine];
    if (terminalCharIdx < currentLine.text.length) {
      const t = setTimeout(() => {
        setTerminalText(prev => prev + currentLine.text[terminalCharIdx]);
        setTerminalCharIdx(i => i + 1);
      }, 35);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setTerminalLine(l => l + 1);
        setTerminalCharIdx(0);
        if (terminalLine < terminalLines.length - 1) setTerminalText('');
      }, 400);
      return () => clearTimeout(t);
    }
  }, [showTerminal, terminalLine, terminalCharIdx, prefersReduced]);

  const makeVariant = (i: number) => ({
    hidden: { opacity: 0, y: prefersReduced ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: delays[i], ease: 'easeOut' as const },
    },
  });

  const blobAnimation = prefersReduced ? undefined : {
    y: [0, 20, 0] as number[],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' as const },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Ambient blobs */}
      <motion.div
        className="blob w-[600px] h-[600px] top-[-200px] right-[-150px]"
        style={{ background: 'rgba(56, 189, 248, 0.06)' }}
        animate={blobAnimation}
      />
      <motion.div
        className="blob w-[500px] h-[500px] bottom-[50px] left-[-150px]"
        style={{ background: 'rgba(99, 102, 241, 0.05)' }}
        animate={blobAnimation}
        transition={{ delay: 4 }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl w-full">

        {/* Eyebrow */}
        {/* <motion.div
          variants={makeVariant(0)}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <span className="font-mono text-sm md:text-base text-accent tracking-wider">
            {typed}
            <span className="animate-blink">|</span>
          </span>
        </motion.div> */}

        {/* Main Heading */}
        <motion.h1
          variants={makeVariant(1)}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
        >
          I craft{' '}
          <span className="gradient-text">digital</span>
          <br />
          <span className="text-text">experiences that</span>
          <br />
          <span className="text-text">perform.</span>
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          variants={makeVariant(2)}
          initial="hidden"
          animate="visible"
          className="text-textSoft text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Building high-performance SaaS products, dashboards, and mobile apps
          with React, Next.js, TypeScript — and AI-augmented workflows.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={makeVariant(3)}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-bg font-semibold
              hover:bg-accentDim hover:scale-105 hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]
              transition-all duration-300"
          >
            View My Work
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-accent/40 text-accent font-medium
              hover:bg-accent/10 hover:border-accent hover:scale-105 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]
              transition-all duration-300"
          >
            <Download size={16} />
            Download Resume
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={makeVariant(4)}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-6 mb-12"
        >
          {[
            { icon: GithubIcon, href: personalInfo.github, label: 'GitHub' },
            { icon: LinkedinIcon, href: personalInfo.linkedin, label: 'LinkedIn' },
            { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-textSoft
                hover:text-accent hover:border-accent/40 hover:bg-accent/5 hover:-translate-y-1
                transition-all duration-300"
            >
              <Icon size={18} />
            </a>
          ))}
          <span className="text-border">|</span>
          <button
            onClick={() => setShowTerminal(v => !v)}
            className="font-mono text-xs text-muted hover:text-accent transition-colors px-3 py-1.5
              rounded border border-border/50 hover:border-accent/30"
            title="Toggle terminal easter egg"
          >
            {showTerminal ? '$ hide' : '$ about me'}
          </button>
        </motion.div>

        {/* Terminal Easter Egg */}
        {showTerminal && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="inline-block text-left bg-surface border border-border rounded-xl p-5 font-mono text-sm mb-8
              shadow-2xl shadow-black/50 min-w-[360px]"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-red-500/70"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/70"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/70"></span>
              <span className="ml-2 text-muted text-xs">terminal — ayush</span>
            </div>
            {terminalLines.slice(0, terminalLine + 1).map((line, idx) => (
              <div key={idx} className="flex gap-2 mb-1">
                <span className="text-accent">{line.prompt}</span>
                <span className="text-text/80">
                  {idx < terminalLine ? line.text : terminalText}
                  {idx === terminalLine && <span className="animate-blink text-accent">▌</span>}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Scroll indicator — pinned to very bottom of section */}
      <motion.div
        variants={makeVariant(5)}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted/70">Scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-accent/40 to-transparent" />
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-accent/60"
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
