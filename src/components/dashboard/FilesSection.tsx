
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
            title="One Pager"
            description="Quick overview document"
            fileName="One Pager.pdf"
            displayName="One Pager"
            onDownload={onFileDownload}
          />
          
          <FileDownloadCard
            title="Complete Documentation"
            description="Comprehensive business plan"
            fileName="Bussiness Plan.pdf"
            displayName="Complete Documentation"
            onDownload={onFileDownload}
          />
        </div>
      </div>
    </section>
  );
};

export default FilesSection;
