import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const loadingTexts = [
  'Initializing Core System...',
  'Crafting Digital Experiences...',
  'Building Modern Web Applications...',
  'Compiling Premium Interfaces...',
  'Ready.'
];

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  // Animate progress and change text dynamically
  useEffect(() => {
    // Lock scroll during splash screen
    document.body.style.overflow = 'hidden';

    // Progress counter
    const duration = 2400; // 2.4s total time
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          // Wait briefly, then finish
          setTimeout(() => {
            onComplete();
            document.body.style.overflow = '';
          }, 300);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  // Change loading text sequentially based on progress
  useEffect(() => {
    if (progress < 25) {
      setTextIndex(0);
    } else if (progress < 50) {
      setTextIndex(1);
    } else if (progress < 75) {
      setTextIndex(2);
    } else if (progress < 95) {
      setTextIndex(3);
    } else {
      setTextIndex(4);
    }
  }, [progress]);

  // Particle positions
  const particles = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0F172A] overflow-hidden">
      {/* Background Mesh Gradient and Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] aspect-square rounded-full bg-gradient-to-br from-[#7C3AED]/20 to-transparent blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] sm:w-[500px] aspect-square rounded-full bg-gradient-to-br from-[#06B6D4]/15 to-transparent blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
        
        {/* Subtle grid mesh overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0F172A_90%)]" />
      </div>

      {/* Particles System */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -100 - Math.random() * 100],
              x: [0, (Math.random() - 0.5) * 40],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Central Liquid Glass Container */}
      <div className="relative flex flex-col items-center justify-center z-10 scale-[0.85] sm:scale-100">
        
        {/* Glowing Halo */}
        <div className="absolute w-44 h-44 rounded-full bg-[#7C3AED]/15 blur-2xl animate-pulse" />

        {/* Liquid Glass Ring / Orb */}
        <div className="relative w-40 h-40 rounded-full flex items-center justify-center border border-white/20 shadow-2xl backdrop-blur-xl bg-white/[0.04]">
          {/* Liquid Orb Rotating Border Ring */}
          <div className="absolute inset-[-4px] rounded-full border-2 border-transparent border-t-[#7C3AED] border-r-[#06B6D4] border-l-[#22C55E]/40 animate-spin" style={{ animationDuration: '4s' }} />
          <div className="absolute inset-[-12px] rounded-full border border-transparent border-b-[#7C3AED]/40 border-l-[#06B6D4]/30 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }} />

          {/* Monogram Content */}
          <div className="flex flex-col items-center justify-center">
            <span className="font-display text-5xl font-black tracking-tighter bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-md select-none">
              AP
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] mt-1 shadow-[0_0_8px_#06B6D4] animate-pulse" />
          </div>
        </div>

        {/* Text Area */}
        <div className="mt-12 text-center h-16 flex flex-col items-center justify-start min-w-[280px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="text-[#CBD5E1] text-xs font-mono tracking-widest font-semibold uppercase px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02]"
            >
              {loadingTexts[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Loading Progress Indicator */}
        <div className="w-64 h-1 bg-white/5 border border-white/5 rounded-full overflow-hidden relative mt-4 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-[#7C3AED] via-[#06B6D4] to-[#22C55E]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
          {/* Glowing node at the end of progress */}
          <motion.div
            className="absolute top-0 bottom-0 w-2 bg-white shadow-[0_0_10px_#FFF] rounded-full"
            style={{ left: `${Math.min(98, Math.max(0, progress - 1))}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        {/* Percentage Counter */}
        <span className="text-[10px] font-mono text-[#94A3B8] font-bold tracking-wider mt-2">
          SYSTEM_BOOT // {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
