import React from 'react';
import { Quote } from 'lucide-react';

interface QuoteItem {
  quote: string;
  author: string;
}

interface IndustryQuotesProps {
  quotes?: QuoteItem[];
}

const IndustryQuotes: React.FC<IndustryQuotesProps> = ({ quotes }) => {
  const defaultQuotes = [
    {
      quote: "TEST.",
      author: "Steve Jobs"
    },
    {
      quote: "The biggest risk is not taking any risk... In a world that's changing quickly, the only strategy that is guaranteed to fail is not taking risks.",
      author: "Mark Zuckerberg"
    },
    {
      quote: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
      author: "James Cameron"
    }
  ];

  const quotesToDisplay = quotes || defaultQuotes;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
      {quotesToDisplay.map((item, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[140px] flex flex-col justify-between">
          <div className="flex items-start gap-3">
            <Quote className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <blockquote className="text-sm text-gray-700 font-medium italic leading-relaxed">
              "{item.quote}"
            </blockquote>
          </div>
          <div className="border-t pt-2 mt-3">
            <p className="font-semibold text-gray-900 text-sm">- {item.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IndustryQuotes;
