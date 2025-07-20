
import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const HeroSection: React.FC = () => {
  const { isVisible, elementRef } = useIntersectionObserver();

  return (
    <section 
      ref={elementRef}
      className="min-h-screen flex items-center justify-center"
    >
      <div className={`text-center transition-all duration-500 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}>
        <div>
          <img 
            src="/lovable-uploads/289024cd-7882-4667-84d5-d16efa85e32c.webp" 
            alt="Q Logo" 
            className="mx-auto w-72 h-72 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] xl:w-[36rem] xl:h-[36rem] object-contain"
            loading="eager"   
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
