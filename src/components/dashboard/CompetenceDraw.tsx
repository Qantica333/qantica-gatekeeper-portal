
import React from 'react';

interface MarketCompetitionProps {
  textOpacity: number;
  textTransform: string;
}

const DescriptionSection: React.FC<MarketCompetitionProps> = ({ textOpacity, textTransform }) => {
  return (
    <section className="min-h-screen flex items-center py-12">
      <div 
        className="w-full transition-all duration-700 ease-out px-4 sm:px-6 lg:px-8"
        style={{
          opacity: textOpacity,
          transform: textTransform
        }}
      >
        {/* Left-aligned text with proper margin from left edge */}
        <div className="max-w-none">
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed text-left">
            There are a few companies vying for a “similar” target market
          </p>
          {/* Image Section */}
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/CompetenceDraw2.webp" 
              alt="Market Competition" 
              className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketCompetition;
