
import React from 'react';

interface DescriptionSectionProps {
  textOpacity: number;
  textTransform: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ textOpacity, textTransform }) => {
  return (
    <section className="min-h-screen flex items-center py-12">
      <div 
        className="w-full transition-all duration-700 ease-out px-4 sm:px-6 lg:px-8"
        style={{
          opacity: textOpacity,
          transform: textTransform
        }}
      >
        {/* Left-aligned text with proper margin from left edge */}
        <div className="max-w-none">
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed text-left">
            <span className="text-yellow-400">Q</span>ANTICA is a technology company that has built a creative media ecosystem where storytelling is at the center, helping writers enhance and monetize their IPs (in TV, films and video games) using artificial intelligence and blockchain. Its approach combines innovative tools with deep respect for the creators’ vision offering them support that amplifies their work rather than limit it.—<span className="text-yellow-400">Q</span>ANTICA’s QW3 process (patent pending) has been designed with writers with experience in streaming platforms and is the cornerstone to achieve the firm’s ultimate goal: transforming the entertainment industry from the inside out, placing art and authenticity at the heart of the system.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DescriptionSection;
