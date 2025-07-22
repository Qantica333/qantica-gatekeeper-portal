
import React from 'react';
import { Quote } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface Quote1SectionProps {
  titleOpacity: number;
  titleTransform: string;
}

const Quote1Section: React.FC = () => {

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
              "As generative AI takes on more of filmmaking’s creative process, a deeper question emerges: What does it mean when stories are shaped by a system that, for now at least, can’t feel -and whose users may not need it to?"
            </blockquote>
            <p className="font-semibold text-gray-900">- The Los Angeles Times 7/17 2025, interviewing many prominent industry people</p>
          </div>
        </div>
      </div>
</section>
  );
};

export default Quote1Section;
