
import { useState, useEffect } from 'react';

export const useScrollAnimations = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate opacity and transform values based on scroll
  const titleOpacity = Math.max(0, 1 - scrollProgress * 3);
  const titleTransform = `translateY(${scrollProgress * 100}px)`;
  
  const textOpacity = scrollProgress > 0.2 ? Math.min(1, (scrollProgress - 0.2) * 2.5) : 0;
  const textTransform = `translateY(${Math.max(0, 50 - scrollProgress * 150)}px)`;
  
  const filesOpacity = scrollProgress > 0.5 ? Math.min(1, (scrollProgress - 0.5) * 2) : 0;
  const filesTransform = `translateY(${Math.max(0, 50 - (scrollProgress - 0.3) * 150)}px)`;

  return {
    scrollProgress,
    titleOpacity,
    titleTransform,
    textOpacity,
    textTransform,
    filesOpacity,
    filesTransform,
  };
};
