import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string; // e.g. "2+", "10+", "98%", "40%"
  duration?: number; // duration in ms
}

export default function AnimatedCounter({ value, duration = 1200 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [current, setCurrent] = useState(0);

  // Extract number and text around it
  const numMatch = value.match(/\d+/);
  const targetNumber = numMatch ? parseInt(numMatch[0], 10) : 0;
  
  // Non-numeric prefix and suffix (e.g. "+" or "%" or "yrs")
  const prefix = value.substring(0, value.indexOf(numMatch ? numMatch[0] : ''));
  const suffix = value.substring(value.indexOf(numMatch ? numMatch[0] : '') + (numMatch ? numMatch[0].length : 0));

  useEffect(() => {
    if (!isInView || targetNumber === 0) return;

    let start = 0;
    const end = targetNumber;
    const range = end - start;
    
    // Smooth easing/timing
    const stepTime = Math.max(Math.floor(duration / range), 15);
    let currentCount = start;

    const timer = setInterval(() => {
      currentCount += Math.ceil(range / (duration / stepTime));
      if (currentCount >= end) {
        setCurrent(end);
        clearInterval(timer);
      } else {
        setCurrent(currentCount);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, targetNumber, duration]);

  return (
    <span ref={ref} className="font-display">
      {prefix}
      {isInView ? current : 0}
      {suffix}
    </span>
  );
}
