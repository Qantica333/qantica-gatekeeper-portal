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
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Two buttons side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Button 
          onClick={() => handleDownload('Brief Introduction.pdf', 'Brief Introduction')}
          className="w-full h-24 bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-yellow-400 transition-colors flex flex-col items-center justify-center p-4"
        >
          <div className="flex items-center gap-2 mb-1">
            <Download className="w-5 h-5" />
            <span className="font-semibold text-lg">Brief Introduction</span>
          </div>
          <span className="text-sm text-gray-800">Quick overview document</span>
        </Button>
        
        <Button 
          onClick={() => handleDownload('Qantica Business Plan - July 2025.pdf', 'Qantica Business Plan - July 2025')}
          className="w-full h-24 bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-yellow-400 transition-colors flex flex-col items-center justify-center p-4"
        >
          <div className="flex items-center gap-2 mb-1">
            <Download className="w-5 h-5" />
            <span className="font-semibold text-lg">Qantica Business Plan - July 2025</span>
          </div>
          <span className="text-sm text-gray-800">Detailed strategic roadmap</span>
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
