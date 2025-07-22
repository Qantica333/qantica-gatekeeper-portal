
import React from 'react';
import { Download, Quote } from 'lucide-react';


interface TitleSectionProps {
  titleOpacity: number;
  titleTransform: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({ titleOpacity, titleTransform }) => {
  return (
   /* <section className="min-h-screen flex items-center justify-center">
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
  <section>
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
