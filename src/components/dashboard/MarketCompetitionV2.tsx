import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const MarketCompetitionV2: React.FC = () => {
  const { isVisible, elementRef } = useIntersectionObserver();

  return (
    <section
      ref={elementRef}
      className="min-h-[80vh] flex items-center justify-center py-16 bg-black"
    >
      <div
        className={`w-full max-w-6xl flex flex-col lg:flex-row transition-all duration-500 px-4 sm:px-6 lg:px-8 gap-8 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Texto */}
        <div className="w-full lg:w-1/4 flex items-center justify-center px-4">
          <p className="text-xl sm:text-2xl md:text-2xl text-gray-300 font-light leading-relaxed tracking-wide text-center">
            There are a few companies vying for a{" "}
            <span className="italic">"similar"</span>{" "}
            target market
          </p>
        </div>

        {/* Imagen */}
        <div className="w-full lg:w-3/4 flex items-center justify-center">
          <img
            src="/lovable-uploads/CompetenceDraw2.webp"
            alt="Market Competition Analysis"
            className="w-full h-auto object-contain max-h-[70vh]"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            onError={(e) => {
              console.error('Error loading image:', e);
              // Opcional: mostrar imagen de fallback
              // e.currentTarget.src = '/fallback-image.webp';
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default MarketCompetitionV2;
