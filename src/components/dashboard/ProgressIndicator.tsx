
import React from 'react';

interface ProgressIndicatorProps {
  scrollProgress: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ scrollProgress }) => {
  const getProgressIndicatorPosition = () => {
    if (scrollProgress < 0.25) return 0;
    if (scrollProgress < 0.5) return 1;
    if (scrollProgress < 0.75) return 2;
    return 3;
  };

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col space-y-3">
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            getProgressIndicatorPosition() >= index
              ? 'bg-white'
              : 'bg-gray-600 border border-gray-500'
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;
