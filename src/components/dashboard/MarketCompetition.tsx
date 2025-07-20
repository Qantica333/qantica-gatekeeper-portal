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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-2xl sm:text-3xl md:text-4xl text-white font-light leading-relaxed tracking-wide">
              There are a few companies vying for a{" "}
              <span className="text-gray-300 italic">"similar"</span>{" "}
              target market
            </p>
          </div>
          {/* Image Section with enhanced presentation */}
          <div className="flex justify-center">
            <div className="relative max-w-full overflow-hidden rounded-lg shadow-2xl">
              <img 
                src="/lovable-uploads/CompetenceDraw2.webp" 
                alt="Market Competition Analysis" 
                className="w-full h-auto object-contain max-h-[80vh]"
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
