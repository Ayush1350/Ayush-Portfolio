import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection from './ui/AnimatedSection';
import { testimonials } from '../data/portfolio';
import TiltCard from './ui/TiltCard';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  // Slide transition animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: prefersReduced ? 0 : dir > 0 ? 150 : -150,
      opacity: 0,
      filter: prefersReduced ? 'none' : 'blur(8px)',
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
    },
    exit: (dir: number) => ({
      x: prefersReduced ? 0 : dir < 0 ? 150 : -150,
      opacity: 0,
      filter: prefersReduced ? 'none' : 'blur(8px)',
      scale: 0.96,
    }),
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto rotate interval
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const activeTest = testimonials[currentIndex];

  return (
    <div>
      <AnimatedSection>
        <SectionHeading
          label="06 / References"
          title="Client Testimonials"
          subtitle="Feedback from clients and project stakeholders on delivered software modules"
        />
      </AnimatedSection>

      <AnimatedSection delay={150}>
        <div 
          className="relative max-w-2xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Slider Container */}
          <div className="relative overflow-hidden min-h-[300px] flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 220, damping: 26 },
                  opacity: { duration: 0.35 },
                  scale: { duration: 0.35 },
                  filter: { duration: 0.3 },
                }}
                className="w-full"
              >
                <TiltCard maxTilt={4}>
                  <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden group select-none">
                    {/* Glowing mesh background inside slide */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#7C3AED]/8 to-[#06B6D4]/8 rounded-full blur-2xl pointer-events-none" />

                    {/* Star Rating & Quote Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-1">
                        {[...Array(activeTest.rating)].map((_, idx) => (
                          <Star key={idx} size={15} className="fill-amber-400 stroke-amber-400" />
                        ))}
                      </div>
                      <Quote size={32} className="text-[#7C3AED]/20 group-hover:text-[#7C3AED]/40 transition-colors duration-300" />
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-slate-200 text-base md:text-lg italic leading-relaxed mb-8 font-sans">
                      "{activeTest.quote}"
                    </p>

                    {/* Author Details Row */}
                    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                      <div className="w-12 h-12 rounded-full bg-[#7C3AED]/15 border border-[#7C3AED]/20 flex items-center justify-center font-display font-black text-base text-[#06B6D4] shadow-md">
                        {activeTest.avatar ? (
                          <img src={activeTest.avatar} alt={activeTest.author} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          activeTest.author.charAt(0)
                        )}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-slate-100 group-hover:text-[#7C3AED] transition-colors duration-300 leading-tight">
                          {activeTest.author}
                        </h4>
                        <p className="font-mono text-[10px] text-slate-450 uppercase tracking-widest mt-0.5 font-semibold">
                          {activeTest.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6 px-2">
            {/* Dots indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? 'w-8 bg-[#7C3AED]' : 'w-2.5 bg-white/10 hover:bg-white/20'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-white/10 hover:scale-[1.03] transition-all duration-300 cursor-pointer backdrop-blur-md"
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-white/10 hover:scale-[1.03] transition-all duration-300 cursor-pointer backdrop-blur-md"
                aria-label="Next slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
