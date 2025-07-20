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
      author: "Steve Jobs",
      position: "Co-founder, Apple"
    },
    {
      quote: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
      position: "Founder, Disney"
    },
    {
      quote: "Your most unhappy customers are your greatest source of learning.",
      author: "Bill Gates",
      position: "Co-founder, Microsoft"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* File Download Cards - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileDownloadCard
          title="Product Guide"
          description="Complete guide with all features and specifications"
          fileName="product-guide.pdf"
          displayName="Product Guide 2025"
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
      <div className="bg-gray-50 rounded-xl p-8 mt-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What Industry Leaders Say</h2>
          <p className="text-gray-600">Insights from visionaries who shaped the modern world</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industryQuotes.map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-3">
                <Quote className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <blockquote className="text-gray-700 font-medium mb-4 italic">
                    "{item.quote}"
                  </blockquote>
                  <div className="border-t pt-3">
                    <p className="font-semibold text-gray-900">{item.author}</p>
                    <p className="text-sm text-gray-600">{item.position}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileDownloadLayout;
