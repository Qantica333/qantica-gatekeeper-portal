import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Quote } from 'lucide-react';
import { useFileDownload } from '@/hooks/useFileDownload';

const DownloadPage: React.FC = () => {
  const { handleFileDownload } = useFileDownload();

  const handleDownload = (fileName: string, displayName: string) => {
    handleFileDownload(fileName, displayName);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Two buttons side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Button 
          onClick={() => handleDownload('brief-intro.pdf', 'Brief Introduction')}
          className="w-full h-16 bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-lg border-2 border-yellow-400 transition-colors"
        >
          <Download className="w-5 h-5 mr-2" />
          Brief Introduction
        </Button>
        
        <Button 
          onClick={() => handleDownload('tech-docs.pdf', 'Technical Documentation')}
          className="w-full h-16 bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-lg border-2 border-yellow-400 transition-colors"
        >
          <Download className="w-5 h-5 mr-2" />
          Technical Documentation
        </Button>
      </div>

      {/* Single quote box */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-start gap-3">
          <Quote className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <blockquote className="text-lg text-gray-700 font-medium italic leading-relaxed mb-3">
              "Innovation distinguishes between a leader and a follower."
            </blockquote>
            <p className="font-semibold text-gray-900">- Steve Jobs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
