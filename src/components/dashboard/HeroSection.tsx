
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
        {/* Logo - Made Even Bigger as Main Focus */}
        <div>
          <img 
            src="/lovable-uploads/289024cd-7882-4667-84d5-d16efa85e32c.svg" 
            alt="Q Logo" 
            className="mx-auto w-72 h-72 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] xl:w-[36rem] xl:h-[36rem] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
