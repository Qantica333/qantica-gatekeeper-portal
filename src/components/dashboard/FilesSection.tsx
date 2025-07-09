
import React from 'react';
import FileDownloadCard from './FileDownloadCard';

interface FilesSectionProps {
  filesOpacity: number;
  filesTransform: string;
  onFileDownload: (fileName: string, displayName: string) => void;
}

const FilesSection: React.FC<FilesSectionProps> = ({ filesOpacity, filesTransform, onFileDownload }) => {
  return (
    <section className="min-h-screen flex items-center justify-center py-12">
      <div 
        className="max-w-2xl mx-auto w-full transition-all duration-700 ease-out px-4 sm:px-6 lg:px-8"
        style={{
          opacity: filesOpacity,
          transform: filesTransform
        }}
      >
        <div className="space-y-6">
          <FileDownloadCard
            title="Brief Introduction"
            description="Quick overview document"
            fileName="Brief Introduction.pdf"
            displayName="Brief Introduction"
            onDownload={onFileDownload}
          />
          
          <FileDownloadCard
            title="Qantica Business Plan - July 2025"
            description="Detailed strategic roadmap"
            fileName="Qantica Business Plan - July 2025.pdf"
            displayName="Qantica Business Plan - July 2025"
            onDownload={onFileDownload}
          />
        </div>
      </div>
    </section>
  );
};

export default FilesSection;
