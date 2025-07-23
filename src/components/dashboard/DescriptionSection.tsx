
import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';


const DescriptionSection: React.FC = () => {
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
        <div className="max-w-5xl mx-auto">
          <p className="text-sm sm:text-base md:text-base lg:text-lg text-white font-light leading-relaxed tracking-wide">
             <span className="text-white font-medium"><span className="text-yellow-400">Q</span>ANTICA</span> is a technology company that has built a creative media ecosystem where storytelling is at the center, helping writers enhance and monetize their IPs (in TV, films and video games) using artificial intelligence and blockchain. Its approach combines innovative tools with deep respect for the creators' vision offering them support that amplifies their work rather than limit it. <span className="text-white font-medium"><span className="text-yellow-400">Q</span>ANTICA's</span> QW3 process (patent pending) has been designed with writers with experience in streaming platforms and is the cornerstone to achieve the firm's ultimate goal: transforming the entertainment industry from the inside out, placing art and authenticity at the heart of the system.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DescriptionSection;
