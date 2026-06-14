import { Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/SocialIcons';
import { personalInfo } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/40 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="font-mono text-xs text-muted text-center sm:text-left">
          Built with React · TypeScript · Tailwind CSS &nbsp;⚡&nbsp; © {new Date().getFullYear()} Ayush Patel
        </p>

        {/* Made with love */}
        <p className="font-mono text-xs text-muted flex items-center gap-1.5">
          Made with <Heart size={11} className="text-red-400 fill-red-400" /> in Ahmedabad
        </p>

        {/* Social links */}
        <div className="flex items-center gap-3">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center
              text-muted hover:text-accent hover:border-accent/40 transition-all duration-200"
          >
            <GithubIcon size={14} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center
              text-muted hover:text-accent hover:border-accent/40 transition-all duration-200"
          >
            <LinkedinIcon size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
