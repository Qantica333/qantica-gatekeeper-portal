
import React from 'react';
import DownloadPage from './DownloadPage';

interface FilesSectionProps {
  onFileDownload: (fileName: string, displayName: string) => void;
}

const FilesSection: React.FC<FilesSectionProps> = ({ onFileDownload }) => {
  return (
    <section className="min-h-screen flex items-center justify-center py-12">
      <DownloadPage />
    </section>
  );
};

export default FilesSection;
