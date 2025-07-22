
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFileDownload } from '../hooks/useFileDownload';
import ProgressIndicator from './dashboard/ProgressIndicator';
import DashboardHeader from './dashboard/DashboardHeader';
import HeroSection from './dashboard/HeroSection';
import DescriptionSection from './dashboard/DescriptionSection';
import MarketCompetition from './dashboard/MarketCompetition';
import FilesSection from './dashboard/FilesSection';
import QanticaCenter from './dashboard/QanticaCenter';
import TitleSection from './dashboard/TitleSection';

const Dashboard = () => {
  const { logout, userEmail } = useAuth();
  const { handleFileDownload } = useFileDownload();

  return (
    <div className="min-h-screen bg-black">
      <ProgressIndicator />
      
      <DashboardHeader userEmail={userEmail} onLogout={logout} />

      <main className="container mx-auto px-4">
        <HeroSection />

        <TitleSection />
        
        <DescriptionSection />

        <MarketCompetition />

        <QanticaCenter />

        <FilesSection onFileDownload={handleFileDownload} />
      </main>
    </div>
  );
};

export default Dashboard;
