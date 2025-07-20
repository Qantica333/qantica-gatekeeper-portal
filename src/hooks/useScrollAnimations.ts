
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

  // Calculate opacity and transform values based on scroll for 4 sections
  const titleOpacity = Math.max(0, 1 - scrollProgress * 4);
  const titleTransform = `translateY(${scrollProgress * 100}px)`;
  
  const secondTitleOpacity = scrollProgress > 0.15 ? Math.min(1, (scrollProgress - 0.15) * 3) : 0;
  const secondTitleTransform = `translateY(${Math.max(0, 50 - (scrollProgress - 0.1) * 200)}px)`;
  
  // First text section (MarketCompetition) 
  const textOpacity = scrollProgress > 0.25 ? Math.min(1, (scrollProgress - 0.25) * 3) : 0;
  const textTransform = `translateY(${Math.max(0, 50 - (scrollProgress - 0.2) * 150)}px)`;
  
  // Second text section (QanticaCenter)
  const qanticaOpacity = scrollProgress > 0.45 ? Math.min(1, (scrollProgress - 0.45) * 3) : 0;
  const qanticaTransform = `translateY(${Math.max(0, 50 - (scrollProgress - 0.4) * 150)}px)`;
  
  const filesOpacity = scrollProgress > 0.7 ? Math.min(1, (scrollProgress - 0.7) * 2.5) : 0;
  const filesTransform = `translateY(${Math.max(0, 50 - (scrollProgress - 0.65) * 150)}px)`;

  return {
    scrollProgress,
    titleOpacity,
    titleTransform,
    secondTitleOpacity,
    secondTitleTransform,
    textOpacity,
    textTransform,
    qanticaOpacity,
    qanticaTransform,
    filesOpacity,
    filesTransform,
  };
};
