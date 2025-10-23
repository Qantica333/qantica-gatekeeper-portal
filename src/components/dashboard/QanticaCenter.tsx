import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import OrbitSystemV2 from './OrbitSystemV2';

const QanticaCenter: React.FC = () => {
  const { isVisible, elementRef } = useIntersectionObserver();

  return (
    <section ref={elementRef} className="min-h-[80vh] flex items-center py-16">
      <div
        className={`w-full transition-all duration-500 px-4 sm:px-6 lg:px-8 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-2xl sm:text-3xl md:text-4xl text-white font-light leading-relaxed tracking-wide">
              However, we believe{' '}
              <span className="text-white font-medium">
                <span className="text-yellow-400">Q</span>ANTICA
              </span>{' '}
              can be at the{' '}
              <span className="text-yellow-400 font-medium">center</span>{' '}
              of the industry
            </p>
            <p className="text-lg sm:text-xl text-gray-300 mt-4 font-light">
              with the ability to interact with all participants
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative w-full flex justify-center items-center">
              <OrbitSystemV2 /> {/* ✅ componente actualizado */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QanticaCenter;
