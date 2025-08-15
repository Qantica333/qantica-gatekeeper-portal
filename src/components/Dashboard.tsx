
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFileDownload } from '../hooks/useFileDownload';
import ProgressIndicator from './dashboard/ProgressIndicator';
import DashboardHeader from './dashboard/DashboardHeader';
import HeroSection from './dashboard/HeroSection';
//import TitleSection from './dashboard/TitleSection';
import DescriptionSection from './dashboard/DescriptionSection';
import MarketCompetition from './dashboard/MarketCompetition';
import FilesSection from './dashboard/FilesSection';
import QanticaCenter from './dashboard/QanticaCenter';
import Quote1Section from './dashboard/Quote1Section';
import Quote2Section from './dashboard/Quote2Section';
import CombinedVerticalSection from './dashboard/CombinedVerticalSection';


const Dashboard = () => {
  const { logout, userEmail } = useAuth();
  const { handleFileDownload } = useFileDownload();

  return (
    <div className="min-h-screen bg-black">
      <ProgressIndicator />
      
      <DashboardHeader userEmail={userEmail} onLogout={logout} />

      <main className="container mx-auto px-4">
        <HeroSection />

        <CombinedVerticalSection />

        <MarketCompetition />

        <QanticaCenter />

        <FilesSection onFileDownload={handleFileDownload} />
      </main>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
        <p>© 2025 Qantica. All rights reserved.</p>
        <p>Access is restricted to authorized users only. Downloaded materials are confidential and proprietary.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
