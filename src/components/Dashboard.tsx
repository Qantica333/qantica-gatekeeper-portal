
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Download, LogOut, FileText } from 'lucide-react';

const Dashboard = () => {
  const { logout, userEmail } = useAuth();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [availableFiles, setAvailableFiles] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Get list of available files for debugging
    const fetchAvailableFiles = async () => {
      try {
        console.log('Fetching available files from storage bucket...');
        const { data, error } = await supabase.storage
          .from('files')
          .list('', {
            limit: 100,
            offset: 0,
          });

        if (error) {
          console.error('Error fetching file list:', error);
          return;
        }

        const fileNames = data?.map(file => file.name) || [];
        console.log('Available files in bucket:', fileNames);
        setAvailableFiles(fileNames);
      } catch (err) {
        console.error('Error in fetchAvailableFiles:', err);
      }
    };

    fetchAvailableFiles();
  }, []);

  const handleFileDownload = async (fileName: string, displayName: string) => {
    try {
      console.log(`=== DOWNLOAD DEBUG INFO ===`);
      console.log(`Attempting to download: ${fileName}`);
      console.log(`Display name: ${displayName}`);
      console.log(`Available files:`, availableFiles);
      console.log(`File exists in list:`, availableFiles.includes(fileName));
      
      const { data, error } = await supabase.storage
        .from('files')
        .download(fileName);

      if (error) {
        console.error('Download error details:', {
          message: error.message,
          statusCode: error.statusCode,
          error: error
        });
        alert(`Error downloading ${displayName}: ${error.message}`);
        return;
      }

      console.log('Download successful, file size:', data.size);
      
      // Create blob URL and trigger download
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log(`Successfully downloaded ${fileName}`);
    } catch (err) {
      console.error('Unexpected download error:', err);
      alert(`Failed to download ${displayName}. Please try again.`);
    }
  };

  const getProgressIndicatorPosition = () => {
    if (scrollProgress < 0.33) return 0;
    if (scrollProgress < 0.66) return 1;
    return 2;
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Fixed Progress Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-3">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              getProgressIndicatorPosition() >= index
                ? 'bg-white'
                : 'bg-gray-600 border border-gray-500'
            }`}
          />
        ))}
      </div>

      {/* Header */}
      <header className="border-b border-gray-700 bg-black/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Qantica
              </h1>
              <p className="text-gray-400 text-sm mt-1 hidden sm:block">
                Empowering great stories
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm hidden sm:inline">
              {userEmail}
            </span>
            <Button 
              onClick={logout}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-600 hover:bg-gray-700 hover:text-white text-xs px-3 py-1"
            >
              <LogOut className="w-3 h-3 mr-1" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-6xl sm:text-8xl font-bold text-white mb-8">
              Welcome to Qantica
            </h2>
          </div>
        </section>

        {/* Description Section */}
        <section className="min-h-screen flex items-center justify-center py-20">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
              Qantica is a technology company that creates a creative ecosystem where creators are at the center, helping them enhance and monetize their intellectual properties (such as films and video games) through artificial intelligence and blockchain. Its approach combines cutting-edge technology with deep respect for the creator's vision, offering tools that amplify their work rather than limit it. With its QW3 method—already tested by creators with experience in entertainment platforms—Qantica aims to connect generations of talent—past, present, and future—to transform the entertainment industry from the inside out, placing art and authenticity at the heart of the process.
            </p>
          </div>
        </section>

        {/* Files Section */}
        <section className="min-h-screen flex items-center justify-center py-20">
          <div className="max-w-2xl mx-auto w-full">
            <div className="space-y-8">
              {/* One Pager Card */}
              <Card className="bg-gray-800/30 border-gray-700 hover:bg-gray-800/50 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-xl">
                        One Pager
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Quick overview document
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => handleFileDownload('One Pager.pdf', 'One Pager')}
                    className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-medium transition-all duration-200 group-hover:scale-[1.02]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>

              {/* Full Document Card */}
              <Card className="bg-gray-800/30 border-gray-700 hover:bg-gray-800/50 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-xl">
                        Complete Documentation
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Comprehensive business plan
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => handleFileDownload('Bussiness Plan.pdf', 'Complete Documentation')}
                    className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-medium transition-all duration-200 group-hover:scale-[1.02]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
