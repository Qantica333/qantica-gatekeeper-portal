
import React from 'react';
import { Quote } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';


const TitleSection: React.FC = () => {

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

export default TitleSection;
