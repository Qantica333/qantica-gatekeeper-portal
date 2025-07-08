
import React from 'react';

interface HeroSectionProps {
  titleOpacity: number;
  titleTransform: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ titleOpacity, titleTransform }) => {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div 
        className="text-center transition-all duration-700 ease-out"
        style={{
          opacity: titleOpacity,
          transform: titleTransform
        }}
      >
        {/* Q Logo - Made Even Bigger */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/289024cd-7882-4667-84d5-d16efa85e32c.png" 
            alt="Q Logo" 
            className="mx-auto w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] object-contain"
          />
        </div>
        {/* Title - Made Smaller to Give More Space to Logo */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-8">
          Welcome to <span className="text-yellow-400">Q</span>ANTICA
        </h2>
      </div>
    </section>
  );
};

export default HeroSection;
