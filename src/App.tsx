import { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

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
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return <div ref={cursorRef} className="cursor-glow hidden md:block" />;
}

function App() {
  return (
    <div className="relative min-h-screen bg-bg text-text">
      <ScrollProgress />
      <CursorGlow />

      <Navbar />

      <main className="relative z-10">
        <Hero />

        <div className="section-separator" />

        <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
          <About />
        </section>

        <div className="section-separator" />

        <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
          <Skills />
        </section>

        <div className="section-separator" />

        <section id="experience" className="py-24 px-6 max-w-6xl mx-auto">
          <Experience />
        </section>

        <div className="section-separator" />

        <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
          <Projects />
        </section>

        <div className="section-separator" />

        <section id="education" className="py-24 px-6 max-w-6xl mx-auto">
          <Education />
        </section>

        <div className="section-separator" />

        <section id="contact" className="py-24 px-6 max-w-6xl mx-auto">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
