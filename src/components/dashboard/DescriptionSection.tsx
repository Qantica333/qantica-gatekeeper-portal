
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
            <span className="text-yellow-400">Q</span>ANTICA is a technology company that creates a creative ecosystem where creators are at the center, helping them enhance and monetize their intellectual properties (such as films and video games) through artificial intelligence and blockchain. Its approach combines cutting-edge technology with deep respect for the creator's vision, offering tools that amplify their work rather than limit it. With its QW3 method—already tested by creators with experience in entertainment platforms—<span className="text-yellow-400">Q</span>ANTICA aims to connect generations of talent—past, present, and future—to transform the entertainment industry from the inside out, placing art and authenticity at the heart of the process.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DescriptionSection;
