
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Download, LogOut, FileText } from 'lucide-react';

const Dashboard = () => {
  const { logout, userEmail } = useAuth();
  const [scrollProgress, setScrollProgress] = useState(0);

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

  const handleFileDownload = async (fileName: string, displayName: string) => {
    console.log(`Attempting to download: ${fileName}`);
    
    try {
      const { data, error } = await supabase.storage
        .from('files')
        .download(fileName);

      console.log('Download response:', { data, error });

      if (error) {
        console.error('Download error:', error);
        alert(`Error downloading ${displayName}: ${error.message}`);
        return;
      }
      
      if (!data) {
        console.error('No data received');
        alert(`No file data received for ${displayName}`);
        return;
      }

      // Create blob URL and trigger download
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log(`Successfully downloaded: ${fileName}`);
    } catch (err) {
      console.error('Download exception:', err);
      alert(`Failed to download ${displayName}. Please try again.`);
    }
  };

  // Calculate opacity and transform values based on scroll
  const titleOpacity = Math.max(0, 1 - scrollProgress * 3);
  const titleTransform = `translateY(${scrollProgress * 100}px)`;
  
  const textOpacity = scrollProgress > 0.2 ? Math.min(1, (scrollProgress - 0.2) * 2.5) : 0;
  const textTransform = `translateY(${Math.max(0, 50 - scrollProgress * 150)}px)`;
  
  const filesOpacity = scrollProgress > 0.5 ? Math.min(1, (scrollProgress - 0.5) * 2) : 0;
  const filesTransform = `translateY(${Math.max(0, 50 - (scrollProgress - 0.3) * 150)}px)`;

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
                <span className="text-yellow-400">Q</span>ANTICA
              </h1>
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
              className="bg-yellow-400 border-yellow-400 text-black hover:bg-yellow-500 hover:text-black text-xs px-3 py-1"
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
          <div 
            className="text-center transition-all duration-700 ease-out"
            style={{
              opacity: titleOpacity,
              transform: titleTransform
            }}
          >
            {/* Q Logo - Made Much Bigger */}
            <div className="mb-8">
              <img 
                src="/lovable-uploads/289024cd-7882-4667-84d5-d16efa85e32c.png" 
                alt="Q Logo" 
                className="mx-auto w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
              />
            </div>
            <h2 className="text-6xl sm:text-8xl font-bold text-white mb-8">
              Welcome to <span className="text-yellow-400">Q</span>ANTICA
            </h2>
          </div>
        </section>

        {/* Description Section */}
        <section className="min-h-screen flex items-center justify-center py-12">
          <div 
            className="max-w-4xl mx-auto transition-all duration-700 ease-out"
            style={{
              opacity: textOpacity,
              transform: textTransform
            }}
          >
            {/* Left-aligned text */}
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed text-left">
              <span className="text-yellow-400">Q</span>ANTICA is a technology company that creates a creative ecosystem where creators are at the center, helping them enhance and monetize their intellectual properties (such as films and video games) through artificial intelligence and blockchain. Its approach combines cutting-edge technology with deep respect for the creator's vision, offering tools that amplify their work rather than limit it. With its QW3 method—already tested by creators with experience in entertainment platforms—<span className="text-yellow-400">Q</span>ANTICA aims to connect generations of talent—past, present, and future—to transform the entertainment industry from the inside out, placing art and authenticity at the heart of the process.
            </p>
          </div>
        </section>

        {/* Files Section */}
        <section className="min-h-screen flex items-center justify-center py-12">
          <div 
            className="max-w-2xl mx-auto w-full transition-all duration-700 ease-out"
            style={{
              opacity: filesOpacity,
              transform: filesTransform
            }}
          >
            <div className="space-y-6">
              {/* One Pager Card */}
              <Card className="bg-yellow-400 border-yellow-400 hover:bg-yellow-500 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black rounded-lg">
                      <FileText className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <CardTitle className="text-black text-xl">
                        One Pager
                      </CardTitle>
                      <CardDescription className="text-gray-800">
                        Quick overview document
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => handleFileDownload('One Pager.pdf', 'One Pager')}
                    className="w-full bg-black hover:bg-gray-800 text-yellow-400 font-medium transition-all duration-200 group-hover:scale-[1.02]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>

              {/* Full Document Card */}
              <Card className="bg-yellow-400 border-yellow-400 hover:bg-yellow-500 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black rounded-lg">
                      <FileText className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <CardTitle className="text-black text-xl">
                        Complete Documentation
                      </CardTitle>
                      <CardDescription className="text-gray-800">
                        Comprehensive business plan
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => handleFileDownload('Bussiness Plan.pdf', 'Complete Documentation')}
                    className="w-full bg-black hover:bg-gray-800 text-yellow-400 font-medium transition-all duration-200 group-hover:scale-[1.02]"
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
