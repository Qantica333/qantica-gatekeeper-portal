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
      {/* Three buttons in a responsive layout */}
      <div className="space-y-6">
        {/* First two buttons in a row */}
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
              <span className="font-semibold text-lg">Business Plan - July 2025</span>
            </div>
            <span className="text-sm text-gray-800">Detailed strategic roadmap</span>
          </Button>
        </div>

        {/* Third button centered in second row */}
        <div className="flex justify-center">
          <div className="w-full md:w-1/2 max-w-md">
            <Button 
              onClick={() => handleDownload('Founding Team.pdf', 'Founding Team')}
              className="w-full h-24 bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-yellow-400 transition-colors flex flex-col items-center justify-center p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <Download className="w-5 h-5" />
                <span className="font-semibold text-lg">About Us</span>
              </div>
              <span className="text-sm text-gray-800">Founding Team</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
