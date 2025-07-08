
import React from 'react';

interface TitleSectionProps {
  titleOpacity: number;
  titleTransform: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({ titleOpacity, titleTransform }) => {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div 
        className="text-center transition-all duration-700 ease-out"
        style={{
          opacity: titleOpacity,
          transform: titleTransform
        }}
      >
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white">
          <span className="text-yellow-400">Q</span>ANTICA
        </h2>
      </div>
    </section>
  );
};

export default TitleSection;
