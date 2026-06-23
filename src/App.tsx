import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhatIBuild from './components/WhatIBuild';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import BlogPreview from './components/BlogPreview';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      id="scroll-progress"
      style={{ width: `${progress}%` }}
    />
  );
}

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <div ref={glowRef} className="cursor-glow hidden md:block animate-pulse-slow" />
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Preloader Experience */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Content reveals after loader */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, filter: 'blur(16px)', scale: 0.98 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-screen bg-bg text-text selection:bg-[#7C3AED]/30 selection:text-[#F8FAFC]"
        >
          {/* Ambient background liquid glass gradient orbs */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="fixed top-[15%] left-[5%] w-[350px] sm:w-[450px] aspect-square rounded-full bg-gradient-to-br from-[#7C3AED]/18 to-transparent blur-[120px] orb-1" />
            <div className="fixed top-[45%] right-[2%] w-[400px] sm:w-[500px] aspect-square rounded-full bg-gradient-to-br from-[#06B6D4]/15 to-transparent blur-[130px] orb-2" />
            <div className="fixed bottom-[10%] left-[15%] w-[350px] sm:w-[450px] aspect-square rounded-full bg-gradient-to-br from-[#22C55E]/10 to-transparent blur-[120px] orb-3" />
          </div>

          <ScrollProgress />
          <CursorGlow />

          <Navbar />

          <main className="relative z-10">
            <Hero />

            <div className="section-separator" />

            <section id="about" className="py-24 px-6 max-w-5xl mx-auto">
              <About />
            </section>

            <div className="section-separator" />

            <section id="skills" className="py-24 px-6 max-w-5xl mx-auto">
              <WhatIBuild />
            </section>

            <div className="section-separator" />

            <section id="experience" className="py-24 px-6 max-w-5xl mx-auto">
              <Experience />
            </section>

            <div className="section-separator" />

            <section id="projects" className="py-24 px-6 max-w-5xl mx-auto">
              <Projects />
            </section>

            <div className="section-separator" />

            <section id="services" className="py-24 px-6 max-w-5xl mx-auto">
              <Services />
            </section>

            <div className="section-separator" />

            <section id="testimonials" className="py-24 px-6 max-w-5xl mx-auto">
              <Testimonials />
            </section>

            <div className="section-separator" />

            <section id="blog" className="py-24 px-6 max-w-5xl mx-auto">
              <BlogPreview />
            </section>

            <div className="section-separator" />

            <section id="contact" className="py-24 px-6 max-w-5xl mx-auto font-sans">
              <Contact />
            </section>
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;
