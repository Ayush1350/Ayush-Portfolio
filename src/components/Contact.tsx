import { Mail, Phone, Copy, CheckCheck, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/SocialIcons';
import { useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection from './ui/AnimatedSection';
import { personalInfo } from '../data/portfolio';

interface ContactLink {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
  copyValue: string;
}

const contactLinks: ContactLink[] = [
  {
    icon: Mail,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    copyValue: personalInfo.email,
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/ayush1350',
    href: personalInfo.linkedin,
    copyValue: personalInfo.linkedin,
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'github.com/Ayush1350',
    href: personalInfo.github,
    copyValue: personalInfo.github,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    copyValue: personalInfo.phone,
  },
];

export default function Contact() {
  const prefersReduced = useReducedMotion();
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const showCopiedToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }, []);

  const handleCopy = useCallback(async (value: string, idx: number, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIdx(idx);
      showCopiedToast(`✓ ${label} copied to clipboard`);
      setTimeout(() => setCopiedIdx(null), 2000);
    } catch {
      showCopiedToast('Could not copy to clipboard');
    }
  }, [showCopiedToast]);

  return (
    <div>
      <AnimatedSection>
        <SectionHeading
          label="06 / Contact"
          title="Let's Talk"
          subtitle="Open to freelance, full-time, and collaborations"
        />
      </AnimatedSection>

      {/* Toast */}
      <div className={`toast ${showToast ? 'show' : ''}`}>
        {toastMsg}
      </div>

      <AnimatedSection delay={150}>
        <div className="max-w-2xl mx-auto">
          <motion.div
            whileHover={prefersReduced ? {} : { y: -2 }}
            className="gradient-border bg-gradient-to-br from-surface to-bg rounded-2xl p-8 md:p-10
              shadow-2xl shadow-black/30"
          >
            {/* Heading */}
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-text mb-3">
                Let's Build Something{' '}
                <span className="gradient-text">Together</span>
              </h3>
              <p className="text-textSoft leading-relaxed text-sm md:text-base max-w-lg mx-auto">
                Whether you're looking for a freelance frontend engineer, a tech partner for
                your SaaS product, or someone to lead your web/mobile front end — I'd love to
                hear from you.
              </p>
            </div>

            {/* Contact links */}
            <div className="space-y-3">
              {contactLinks.map((link, i) => {
                const Icon = link.icon;
                const isCopied = copiedIdx === i;
                return (
                  <motion.div
                    key={link.label}
                    initial={prefersReduced ? {} : { opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-4 rounded-xl
                      bg-bg/50 border border-border hover:border-accent/40
                      transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20
                        flex items-center justify-center flex-shrink-0
                        group-hover:bg-accent/15 transition-colors">
                        <Icon size={16} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] text-muted uppercase tracking-wider mb-0.5">
                          {link.label}
                        </p>
                        <a
                          href={link.href}
                          target={link.label !== 'Email' && link.label !== 'Phone' ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="text-text text-sm hover:text-accent transition-colors flex items-center gap-1"
                        >
                          {link.value}
                          <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </div>
                    </div>

                    {/* Copy button */}
                    <button
                      onClick={() => handleCopy(link.copyValue, i, link.label)}
                      aria-label={`Copy ${link.label}`}
                      className="p-2 rounded-lg text-muted hover:text-accent hover:bg-accent/10
                        transition-all duration-200 flex-shrink-0"
                    >
                      {isCopied
                        ? <CheckCheck size={15} className="text-emerald-400" />
                        : <Copy size={15} />
                      }
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <a
                href="https://mail.google.com/mail/?view=cm&to=ayushpatel2492002@gmail.com"
                target="_blank"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
                  bg-accent text-bg font-semibold text-sm
                  hover:bg-accentDim hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]
                  hover:scale-105 transition-all duration-300"
              >
                <Mail size={16} />
                Send Me a Message
              </a>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
}
