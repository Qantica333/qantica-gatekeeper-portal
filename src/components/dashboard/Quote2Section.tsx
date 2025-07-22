
import React from 'react';
import { Quote } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface TitleSectionProps {
  titleOpacity: number;
  titleTransform: string;
}

const Quote2Section: React.FC = () => {
    /* return (
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
    */
  const { isVisible, elementRef } = useIntersectionObserver();

  return (
    <section 
      ref={elementRef}
      className="min-h-[80vh] flex items-center py-16"
    >
      <div className={`w-full transition-all duration-500 px-4 sm:px-6 lg:px-8 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}>
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-start gap-3">
          <Quote className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <blockquote className="text-lg text-gray-700 font-medium italic leading-relaxed mb-3">
              "While many writers worry about AI encroaching on authorship, a wave of startups sees opportunity — not to replace writers, they say, but to streamline the clutter around them."
            </blockquote>
            <p className="font-semibold text-gray-900">- The Los Angeles Times 7/17 2025, interviewing many prominent industry people</p>
          </div>
        </div>
      </div>
</section>
  );
};

export default Quote2Section;
