import { Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/SocialIcons';
import { personalInfo } from '../data/portfolio';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'What I Build', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-slate-950/20 backdrop-blur-md pt-16 pb-8 px-6 overflow-hidden">
      
      {/* Footer background ambient glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="w-[300px] h-[300px] absolute -bottom-[100px] right-[10%] opacity-20 blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-10">
        
        {/* Nav list */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-xs font-mono font-bold text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Brand & Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full pt-8 border-t border-white/5 gap-6">
          
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h3 className="font-display font-black text-slate-200 text-lg leading-tight mb-1">
              {personalInfo.name}
            </h3>
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest leading-none">
              Frontend & Mobile Specialist
            </p>
          </div>

          {/* Socials */}
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
                className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-400
                  hover:text-[#7C3AED] hover:border-[#7C3AED]/30 hover:bg-white/10 hover:-translate-y-0.5
                  transition-all duration-300 backdrop-blur-md"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>

        </div>

        {/* Copyright and signature */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full text-slate-500 font-mono text-[10px] gap-4">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <p className="flex items-center gap-1 leading-none">
            Handcrafted with
            <Heart size={10} className="fill-[#7C3AED] text-[#7C3AED] animate-pulse" />
            using React & Framer Motion
          </p>
        </div>

      </div>
    </footer>
  );
}
