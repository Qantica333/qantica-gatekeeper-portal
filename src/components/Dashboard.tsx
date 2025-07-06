
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Download, LogOut, FileText } from 'lucide-react';

const Dashboard = () => {
  const { logout, userEmail } = useAuth();

  const handleFileDownload = async (fileName: string, displayName: string) => {
    try {
      console.log(`Downloading ${fileName} from Supabase files bucket`);
      
      const { data, error } = await supabase.storage
        .from('files')
        .download(fileName);

      if (error) {
        console.error('Error downloading file:', error);
        alert(`Error downloading ${displayName}: ${error.message}`);
        return;
      }

      // Create a blob URL and trigger download
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
      console.error('Download error:', err);
      alert(`Failed to download ${displayName}. Please try again.`);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-700 bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/d5c3b0bf-af34-4646-89bc-26395a9ca31a.png" 
              alt="Qantica Logo" 
              className="h-8 w-auto"
            />
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
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Welcome to Qantica
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Qantica is a technology company that creates a creative ecosystem where creators are at the center, helping them enhance and monetize their intellectual properties (such as films and video games) through artificial intelligence and blockchain. Its approach combines cutting-edge technology with deep respect for the creator's vision, offering tools that amplify their work rather than limit it. With its QW3 method—already tested by creators with experience in entertainment platforms—Qantica aims to connect generations of talent—past, present, and future—to transform the entertainment industry from the inside out, placing art and authenticity at the heart of the process.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
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

          {/* Info Section */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="inline-block p-6 bg-gray-800/20 rounded-lg border border-gray-700">
              <p className="text-gray-400 text-sm">
                Need access to additional resources? Contact your administrator.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
