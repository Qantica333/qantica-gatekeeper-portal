
import React from 'react';

interface CompetenceDrawProps {
  textOpacity: number;
  textTransform: string;
}

const DescriptionSection: React.FC<CompetenceDrawProps> = ({ textOpacity, textTransform }) => {
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
            There are a few companies vying for a “similar” target market
          </p>
        </div>
      </div>
    </section>
  );
};

export default CompetenceDraw;
