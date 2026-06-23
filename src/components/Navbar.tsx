import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import MagneticButton from './ui/MagneticButton';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Capabilities', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

const sectionIds = navLinks.map(l => l.href.replace('#', ''));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.25, rootMargin: '-80px 0px -35% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = useCallback((href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-5 transition-all duration-300 pointer-events-none">
        <div
          className={`max-w-5xl mx-auto rounded-full transition-all duration-500 flex items-center justify-between pointer-events-auto ${
            scrolled
              ? 'bg-slate-950/40 backdrop-blur-2xl border border-white/12 shadow-[0_10px_30px_rgba(0,0,0,0.3)] px-6 py-2.5'
              : 'bg-white/[0.02] backdrop-blur-md border border-white/5 px-6 py-4'
          }`}
        >
          {/* Brand Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-lg font-bold group flex items-center gap-0 tracking-tight cursor-pointer"
          >
            <span className="text-slate-100 group-hover:text-[#7C3AED] transition-colors duration-300">
              {personalInfo.name.split(' ')[0]}
            </span>
            <span className="text-[#06B6D4] group-hover:text-[#7C3AED] transition-colors duration-300 ml-1">
              {personalInfo.name.split(' ')[1]}
            </span>
            <span className="animate-blink text-[#7C3AED] ml-0.5 font-mono">_</span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-xs font-mono font-bold transition-all duration-300 relative py-1 cursor-pointer ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-[#7C3AED]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-full transition-all duration-300 ${
                    activeSection === link.href.replace('#', '') ? 'w-5' : 'w-0'
                  }`}
                />
              </button>
            ))}
            <MagneticButton
              onClick={() => scrollTo('#contact')}
              className="px-4 py-2 rounded-xl text-white text-xs font-semibold uppercase tracking-wider
                bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:shadow-[0_0_20px_rgba(124,58,237,0.45)] hover:scale-103 transition-all duration-300 cursor-pointer"
            >
              Hire Me
            </MagneticButton>
          </div>

          {/* Mobile Hamburger toggle */}
          <button
            className="md:hidden text-slate-400 hover:text-slate-100 transition-colors p-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Glass Menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-40 md:hidden overflow-hidden">
            {/* Backdrop filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            {/* Slide Down Glass Panel */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="absolute top-0 left-0 right-0 bg-[#0F172A]/90 backdrop-blur-3xl border-b border-white/12 shadow-[0_20px_40px_rgba(0,0,0,0.5)] p-6 pt-28 pb-10 flex flex-col items-center gap-6 rounded-b-[32px]"
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`text-xl font-display font-bold transition-all duration-300 cursor-pointer ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-[#7C3AED]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              
              <motion.a
                href="https://mail.google.com/mail/?view=cm&to=ayushpatel2492002@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-4 w-full max-w-[200px] text-center px-6 py-3 rounded-2xl text-white font-semibold uppercase tracking-wider text-sm
                  bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] shadow-lg hover:shadow-[0_0_20px_rgba(124,58,237,0.45)] transition-all duration-300"
              >
                Hire Me
              </motion.a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
