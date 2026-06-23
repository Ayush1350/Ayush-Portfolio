import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection from './ui/AnimatedSection';
import { personalInfo } from '../data/portfolio';
import TiltCard from './ui/TiltCard';
import MagneticButton from './ui/MagneticButton';

interface FieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  required?: boolean;
}

function InputField({ label, id, type = 'text', value, onChange, placeholder, required = true }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative pt-4">
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all duration-300 font-mono text-[9px] uppercase tracking-wider font-semibold pointer-events-none ${
          active
            ? 'top-0 text-[#7C3AED] opacity-100'
            : 'top-7 text-slate-500 opacity-60'
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ''}
        className="w-full bg-slate-950/30 border border-white/10 rounded-2xl p-3.5 text-slate-100 placeholder-slate-600 text-sm font-sans focus:outline-none focus:border-[#7C3AED]/40 focus:ring-1 focus:ring-[#7C3AED]/40 backdrop-blur-md transition-all duration-300 shadow-inner"
      />
    </div>
  );
}

function TextAreaField({ label, id, value, onChange, placeholder, required = true }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative pt-4">
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all duration-300 font-mono text-[9px] uppercase tracking-wider font-semibold pointer-events-none ${
          active
            ? 'top-0 text-[#7C3AED] opacity-100'
            : 'top-7 text-slate-500 opacity-60'
        }`}
      >
        {label}
      </label>
      <textarea
        id={id}
        required={required}
        rows={4}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ''}
        className="w-full bg-slate-950/30 border border-white/10 rounded-2xl p-3.5 text-slate-100 placeholder-slate-600 text-sm font-sans focus:outline-none focus:border-[#7C3AED]/40 focus:ring-1 focus:ring-[#7C3AED]/40 backdrop-blur-md resize-none transition-all duration-300 shadow-inner"
      />
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center text-center p-8 min-h-[350px]"
    >
      {/* Animated Checkmark Circle */}
      <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
        <svg className="w-10 h-10 stroke-emerald-455" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            d="M20 6L9 17l-5-5"
          />
        </svg>
        {/* Dynamic pulse ripples */}
        <div className="absolute inset-0 rounded-full border border-emerald-450/30 animate-ping opacity-75" style={{ animationDuration: '2s' }} />
      </div>

      <h3 className="font-display text-2xl font-bold text-slate-100 mb-2">Message Sent!</h3>
      <p className="text-slate-350 text-sm leading-relaxed max-w-sm mb-8 font-sans">
        Thank you for reaching out, Ayush. I've received your query and will reply within 2 to 4 business hours.
      </p>

      <button
        onClick={onReset}
        className="px-6 py-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
      >
        Send Another Message
      </button>
    </motion.div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus('sending');

    // Simulate server side request
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const handleReset = () => {
    setStatus('idle');
  };

  return (
    <div>
      <AnimatedSection>
        <SectionHeading
          label="08 / Contact"
          title="Get In Touch"
          subtitle="Let's build something exceptional together. Drop a message below or reach out via email."
        />
      </AnimatedSection>

      <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column — Contact Details */}
        <div className="md:col-span-5 space-y-6">
          <AnimatedSection delay={100}>
            <TiltCard maxTilt={5}>
              <div className="glass-card rounded-3xl p-6 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#7C3AED]/5 to-transparent rounded-full blur-xl" />
                
                <div className="flex gap-4 items-start mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-[#7C3AED]/10 border border-white/10 flex items-center justify-center flex-shrink-0 text-[#7C3AED]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-100 text-sm leading-none mb-1.5">Email Me</h4>
                    <a
                      href="https://mail.google.com/mail/?view=cm&to=ayushpatel2492002@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-350 text-sm hover:text-[#7C3AED] transition-colors break-all"
                    >
                      ayushpatel2492002@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-[#06B6D4]/10 border border-white/10 flex items-center justify-center flex-shrink-0 text-[#06B6D4]">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-100 text-sm leading-none mb-1.5">Call / Text</h4>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="text-slate-350 text-sm hover:text-[#06B6D4] transition-colors"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-white/10 flex items-center justify-center flex-shrink-0 text-emerald-450">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-100 text-sm leading-none mb-1.5">Location</h4>
                    <p className="text-slate-350 text-sm">{personalInfo.location}</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </AnimatedSection>

          {/* Connect statement */}
          <AnimatedSection delay={150}>
            <TiltCard maxTilt={4}>
              <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
                <div className="flex gap-2 items-center mb-3">
                  <MessageSquare size={14} className="text-[#7C3AED]" />
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-widest font-semibold">Typical Response Time</span>
                </div>
                <p className="text-slate-350 text-sm leading-relaxed font-sans">
                  I am usually responsive within 2 to 4 business hours to address query requests, layout plans, or scheduling.
                </p>
              </div>
            </TiltCard>
          </AnimatedSection>
        </div>

        {/* Right Column — Contact Form / Success State */}
        <div className="md:col-span-7">
          <AnimatedSection delay={200}>
            <TiltCard maxTilt={4} className="h-full">
              <div className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[400px] flex flex-col justify-center">
                
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <SuccessState onReset={handleReset} />
                  ) : (
                    <motion.form
                      key="contact-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <InputField
                        label="Full Name"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                      />

                      <InputField
                        label="Email Address"
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                      />

                      <TextAreaField
                        label="Your Message"
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can I help with your project?"
                      />

                      <div className="pt-4">
                        <MagneticButton
                          onClick={() => {}}
                          className="w-full group py-3.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(124,58,237,0.45)] hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          {status === 'sending' ? (
                            <span className="flex items-center justify-center gap-2">
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Sending Message...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              Send Message
                              <Send size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            </span>
                          )}
                        </MagneticButton>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

              </div>
            </TiltCard>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
