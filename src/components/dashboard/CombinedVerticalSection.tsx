import React from 'react';
import { Quote } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const CombinedVerticalSection: React.FC = () => {
  const { isVisible: quote1Visible, elementRef: quote1Ref } = useIntersectionObserver({ threshold: 0.3 });
  const { isVisible: descriptionVisible, elementRef: descriptionRef } = useIntersectionObserver({ threshold: 0.2 });
  const { isVisible: quote2Visible, elementRef: quote2Ref } = useIntersectionObserver({ threshold: 0.3 });

  return (
    <section className="py-16">
      {/* Quote 1 -  Right Side */}
      <div 
        ref={quote1Ref as React.RefObject<HTMLDivElement>}
        className="min-h-[60vh] flex items-center justify-end px-4 sm:px-6 lg:px-8"
      >
        <div className={`w-full max-w-2xl transition-all duration-700 ${
          quote1Visible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-8'
        }`}>
          <div className="bg-white rounded-lg p-8 shadow-lg border ml-auto">
            <div className="flex items-start gap-4">
              <Quote className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <blockquote className="text-sm sm:text-base md:text-base lg:text-lg text-gray-700 font-medium italic leading-relaxed mb-4">
                  "As generative AI takes on more of filmmaking's creative process, a deeper question emerges: What does it mean when stories are shaped by a system that, for now at least, can't feel -and whose users may not need it to?"
                </blockquote>
                <p className="text-sm sm:text-base md:text-base lg:text-l font-semibold text-gray-900">- The LA Times 7/17/25, "Hollywood's being reshaped by generative AI. What does that mean for screenwriters?"</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description - Left Side */}
      <div 
        ref={descriptionRef as React.RefObject<HTMLDivElement>}
        className="min-h-[60vh] flex items-center justify-start px-4 sm:px-6 lg:px-8"
      >
        <div className={`w-full max-w-4xl transition-all duration-700 ${
          descriptionVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-8'
        }`}>
          {/* <div className="mr-auto">
            <p className="text-2xl sm:text-3xl md:text-4xl text-white font-light leading-relaxed tracking-wide">*/}
          <div className="max-w-5xl mx-auto">
          <p className="text-sm sm:text-base md:text-base lg:text-lg text-white font-light leading-relaxed tracking-wide">
              <span className="text-white font-medium"><span className="text-yellow-400">Q</span>ANTICA</span>  is a blockchain technology company that deploys AI and other tools to build a creative media ecosystem where storytelling is at the center, helping writers enhance and monetize their IPs (in TV, films, and video games) through intelligent technology and blockchain. Its approach combines innovation with deep respect for the creators’ vision, offering them support that amplifies their work rather than limits it. <span className="text-white font-medium"><span className="text-yellow-400">Q</span>ANTICA's QIP process</span> (patent pending) has been developed with writers experienced in streaming platforms and stands as the cornerstone of the firm’s ultimate goal: transforming the entertainment industry from the inside out, placing art and authenticity at the heart of the system.</p>
          </div>
        </div>
      </div>

      {/* Quote 2 - Right Side, Below Quote 1 */}
      <div 
        ref={quote2Ref as React.RefObject<HTMLDivElement>}
        className="-screen flex items-center justify-end px-4 sm:px-6 lg:px-8"
      >
        <div className={`w-full max-w-2xl transition-all duration-700 ${
          quote2Visible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-8'
        }`}>
          <div className="bg-white rounded-lg p-8 shadow-lg border ml-auto">
            <div className="flex items-start gap-4">
              <Quote className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <blockquote className="text-sm sm:text-base md:text-base lg:text-lg text-gray-700 font-medium italic leading-relaxed mb-4">
                  "While many writers worry about AI encroaching on authorship, a wave of startups sees opportunity — not to replace writers, they say, but to streamline the clutter around them."
                </blockquote>
                <p className="text-sm sm:text-base md:text-base lg:text-l font-semibold text-gray-900">-The LA Times 7/17/25, "Hollywood's being reshaped by generative AI. What does that mean for screenwriters?"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CombinedVerticalSection;
