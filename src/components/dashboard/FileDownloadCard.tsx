import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Quote } from 'lucide-react';

interface FileDownloadCardProps {
  title: string;
  description: string;
  fileName: string;
  displayName: string;
  onDownload: (fileName: string, displayName: string) => void;
}

const FileDownloadCard: React.FC<FileDownloadCardProps> = ({ 
  title, 
  description, 
  fileName, 
  displayName, 
  onDownload 
}) => {
  return (
    <Card className="bg-yellow-400 border-yellow-400 hover:bg-yellow-500 transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black rounded-lg">
            <FileText className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <CardTitle className="text-black text-xl">
              {title}
            </CardTitle>
            <CardDescription className="text-gray-800">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={() => onDownload(fileName, displayName)}
          className="w-full bg-black hover:bg-gray-800 text-yellow-400 font-medium transition-all duration-200 group-hover:scale-[1.02]"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </CardContent>
    </Card>
  );
};

const FileDownloadLayout: React.FC = () => {
  const handleDownload = (fileName: string, displayName: string) => {
    console.log(`Downloading ${fileName} as ${displayName}`);
    // Add your download logic here
  };

  const industryQuotes = [
    {
      quote: "Innovation distinguishes between a leader and a follower.",
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

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* File Download Cards - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileDownloadCard
          title="Brief Introduction"
          description="Complete guide with all features and specifications"
          fileName="brief-intro.pdf"
          displayName="Brief Introduction"
          onDownload={handleDownload}
        />
        <FileDownloadCard
          title="Technical Documentation"
          description="Detailed technical specifications and API reference"
          fileName="tech-docs.pdf"
          displayName="Technical Documentation"
          onDownload={handleDownload}
        />
      </div>

      {/* Industry Quotes Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {industryQuotes.map((item, index) => (
          <div key={index} className="text-center p-6">
            <blockquote className="text-lg font-medium text-gray-700 mb-4 italic">
              "{item.quote}"
            </blockquote>
            <p className="font-semibold text-gray-900">- {item.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileDownloadLayout;
