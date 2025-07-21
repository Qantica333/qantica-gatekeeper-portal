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
          className="w-full bg-black hover:bg-gray-800 text-yellow-400 font-medium transition-all duration-200 group-hover:scale-[1.02] rounded-sm py-3"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </CardContent>
    </Card>
  );
};

export default FileDownloadCard;
