mport React from 'react';
import FileDownloadCard from './FileDownloadCard';
import IndustryQuotes from './IndustryQuotes';

const DownloadPage: React.FC = () => {
  const handleDownload = (fileName: string, displayName: string) => {
    console.log(`Downloading ${fileName} as ${displayName}`);
    // Add your actual download logic here
    // For example:
    // const link = document.createElement('a');
    // link.href = `/path/to/${fileName}`;
    // link.download = displayName;
    // link.click();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Two cards side by side */}
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

      {/* Quotes section */}
      <IndustryQuotes />
    </div>
  );
};

export default DownloadPage;
