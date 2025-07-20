import React, { useState, useEffect, useCallback } from 'react';

const ProgressIndicator: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Throttle scroll events for better performance
  const throttle = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    let lastExecTime = 0;
    return function (this: any, ...args: any[]) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
        setScrollProgress(progress);
      });
    }, 16); // ~60fps

    // Add passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [throttle]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
      <div 
        className="h-full bg-yellow-400 transition-transform duration-75 ease-out origin-left"
        style={{ 
          transform: `scaleX(${scrollProgress})`,
          willChange: 'transform'
        }}
      />
    </div>
  );
};

export default ProgressIndicator;
