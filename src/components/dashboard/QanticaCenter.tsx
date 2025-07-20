
import React from 'react';

interface QanticaCenterProps {
  textOpacity: number;
  textTransform: string;
}

const QanticaCenter: React.FC<QanticaCenterProps> = ({ textOpacity, textTransform }) => {
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
              However, we believe{" "}
              <span className="text-blue-400 font-medium">Qantica</span>{" "}
              can be at the{" "}
              <span className="text-yellow-400 font-medium">center</span>{" "}
              of the industry
            </p>
            <p className="text-lg sm:text-xl text-gray-300 mt-4 font-light">
              with the ability to interact with all participants
            </p>
          </div>
          {/* Image Section with enhanced presentation */}
          <div className="flex justify-center">
            <div className="relative max-w-full overflow-hidden rounded-lg shadow-2xl">
              <img 
                src="/lovable-uploads/QanticaCenter.webp" 
                alt="Qantica at the Center of Industry" 
                className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
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

export default QanticaCenter;
