
import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const MarketCompetition: React.FC = () => {
  const { isVisible, elementRef } = useIntersectionObserver();

  return (
    <section 
      ref={elementRef}
      className="min-h-[80vh] flex items-center py-16"
    >
      <div className={`w-full transition-all duration-500 px-4 sm:px-6 lg:px-8 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-300 font-light leading-relaxed tracking-wide">
              There are a few companies vying for a{" "}
              <span className="text-gray-300 italic">"similar"</span>{" "}
              target market
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative max-w-full overflow-hidden rounded-lg shadow-2xl">
              <img 
                src="/lovable-uploads/CompetenceDraw2.webp" 
                alt="Market Competition Analysis" 
                className="w-full h-auto object-contain max-h-[70vh]"
                loading="eager"     
                fetchPriority="high" 
                decoding="async"  
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketCompetition;
