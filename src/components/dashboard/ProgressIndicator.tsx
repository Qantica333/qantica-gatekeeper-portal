import React, { useState, useEffect, useCallback, useRef } from 'react';

const ProgressIndicator: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafIdRef = useRef<number>();
  const lastProgressRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
          
          // Only update if there's a meaningful change (reduces micro-updates)
          const progressDiff = Math.abs(progress - lastProgressRef.current);
          if (progressDiff > 0.001) {
            setScrollProgress(progress);
            lastProgressRef.current = progress;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50 transform-gpu">
      <div 
        className="h-full bg-yellow-400 origin-left transform-gpu"
        style={{ 
          transform: `scaleX(${scrollProgress})`,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      />
    </div>
  );
};

export default ProgressIndicator;
