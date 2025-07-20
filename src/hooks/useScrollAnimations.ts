
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

  // Calculate opacity and transform values based on scroll for sections
  const titleOpacity = Math.max(0, 1 - scrollProgress * 3);
  const titleTransform = `translateY(${scrollProgress * 80}px)`;
  
  const secondTitleOpacity = scrollProgress > 0.15 ? Math.min(1, (scrollProgress - 0.15) * 3) : 0;
  const secondTitleTransform = `translateY(${Math.max(0, 50 - (scrollProgress - 0.1) * 200)}px)`;
  
  // Description section - appears first
  const descriptionOpacity = scrollProgress > 0.2 ? Math.min(1, (scrollProgress - 0.2) * 4) : 0;
  const descriptionTransform = `translateY(${Math.max(0, 50 - (scrollProgress - 0.15) * 150)}px)`;
  
  // Market Competition section
  const textOpacity = scrollProgress > 0.4 ? Math.min(1, (scrollProgress - 0.4) * 4) : 0;
  const textTransform = `translateY(${Math.max(0, 50 - (scrollProgress - 0.35) * 150)}px)`;
  
  // Qantica Center section
  const qanticaOpacity = scrollProgress > 0.6 ? Math.min(1, (scrollProgress - 0.6) * 4) : 0;
  const qanticaTransform = `translateY(${Math.max(0, 50 - (scrollProgress - 0.55) * 150)}px)`;
  
  const filesOpacity = scrollProgress > 0.8 ? Math.min(1, (scrollProgress - 0.8) * 3) : 0;
  const filesTransform = `translateY(${Math.max(0, 50 - (scrollProgress - 0.75) * 150)}px)`;

  return {
    scrollProgress,
    titleOpacity,
    titleTransform,
    secondTitleOpacity,
    secondTitleTransform,
    descriptionOpacity,
    descriptionTransform,
    textOpacity,
    textTransform,
    qanticaOpacity,
    qanticaTransform,
    filesOpacity,
    filesTransform,
  };
};
