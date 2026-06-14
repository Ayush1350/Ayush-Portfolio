import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

const sectionIds = navLinks.map(l => l.href.replace('#', ''));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
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
        { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-border/50 shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-lg font-semibold group flex items-center gap-0"
          >
            <span className="text-accent">{personalInfo.name.split(' ')[0]}</span>
            <span className="text-text"> {personalInfo.name.split(' ')[1]}</span>
            <span className="animate-blink text-accent ml-0.5">_</span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-sm transition-colors duration-200 relative group ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-accent'
                    : 'text-textSoft hover:text-text'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                  activeSection === link.href.replace('#', '') ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            ))}
            <a
              href="https://mail.google.com/mail/?view=cm&to=ayushpatel2492002@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg border border-accent/40 text-accent text-sm font-medium
                hover:bg-accent/10 hover:border-accent hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]
                transition-all duration-300 font-mono"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-textSoft hover:text-accent transition-colors p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-bg/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-8 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{ transitionDelay: `${i * 60}ms` }}
              className={`text-2xl font-semibold transition-all duration-300 ${
                mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } ${activeSection === link.href.replace('#', '') ? 'text-accent' : 'text-text hover:text-accent'}`}
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://mail.google.com/mail/?view=cm&to=ayushpatel2492002@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-6 py-3 rounded-lg border border-accent/40 text-accent font-mono
              hover:bg-accent/10 transition-all duration-300"
          >
            Hire Me
          </a>
        </div>
      </div>
    </>
  );
}
