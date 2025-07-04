
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { appConfig } from '../config/app-config';
import { Download, LogOut, FileText } from 'lucide-react';

const Dashboard = () => {
  const { logout, userEmail } = useAuth();

  const handleFileDownload = (fileName: string, url: string) => {
    console.log(`Downloading ${fileName} from ${url}`);
    // For now, this will just log. Once connected to Supabase, 
    // this will handle actual file downloads
    alert(`File download will be available once connected to Supabase: ${fileName}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-700 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              {appConfig.title}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {appConfig.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">
              {userEmail}
            </span>
            <Button 
              onClick={logout}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Welcome to {appConfig.title}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Access your exclusive documents and resources
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* One Pager Card */}
            <Card className="bg-gray-800/30 border-gray-700 hover:bg-gray-800/50 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-xl">
                      {appConfig.files.onePager.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {appConfig.files.onePager.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => handleFileDownload(appConfig.files.onePager.name, appConfig.files.onePager.url)}
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
                      {appConfig.files.fullDocument.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {appConfig.files.fullDocument.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => handleFileDownload(appConfig.files.fullDocument.name, appConfig.files.fullDocument.url)}
                  className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-medium transition-all duration-200 group-hover:scale-[1.02]"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Info Section */}
          <div className="mt-16 text-center">
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
