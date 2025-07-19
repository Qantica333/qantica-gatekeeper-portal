import React from 'react';
interface MarketCompetitionProps {
  textOpacity: number;
  textTransform: string;
}
const MarketCompetition: React.FC<MarketCompetitionProps> = ({ textOpacity, textTransform }) => {
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
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed text-left mb-8">
            There are a few companies vying for a "similar" target market
          </p>
          {/* Image Section - Made Much Bigger */}
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/CompetenceDraw2.webp" 
              alt="Market Competition" 
              className="w-full max-w-4xl sm:max-w-5xl md:max-w-6xl lg:max-w-7xl xl:max-w-none object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default MarketCompetition;
