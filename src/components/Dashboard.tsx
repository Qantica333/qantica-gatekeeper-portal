
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useScrollAnimations } from '../hooks/useScrollAnimations';
import { useFileDownload } from '../hooks/useFileDownload';
import ProgressIndicator from './dashboard/ProgressIndicator';
import DashboardHeader from './dashboard/DashboardHeader';
import HeroSection from './dashboard/HeroSection';
import TitleSection from './dashboard/TitleSection';
import DescriptionSection from './dashboard/DescriptionSection';
import MarketCompetition from './dashboard/MarketCompetition';
import FilesSection from './dashboard/FilesSection';
import QanticaCenter from './dashboard/QanticaCenter';

const Dashboard = () => {
  const { logout, userEmail } = useAuth();
  const { 
    scrollProgress, 
    titleOpacity, 
    titleTransform,
    secondTitleOpacity,
    secondTitleTransform,
    textOpacity, 
    textTransform, 
    filesOpacity, 
    filesTransform 
  } = useScrollAnimations();
  const { handleFileDownload } = useFileDownload();

  return (
    <div className="min-h-screen bg-black">
      <ProgressIndicator scrollProgress={scrollProgress} />
      
      <DashboardHeader userEmail={userEmail} onLogout={logout} />

      <main className="container mx-auto px-4">
        <HeroSection 
          titleOpacity={titleOpacity} 
          titleTransform={titleTransform} 
        />

        <TitleSection 
          titleOpacity={secondTitleOpacity} 
          titleTransform={secondTitleTransform} 
        />

        <DescriptionSection 
          textOpacity={textOpacity} 
          textTransform={textTransform} 
        />

        <MarketCompetition
          textOpacity={textOpacity} 
          textTransform={textTransform} 
        />

        <QanticaCenter
          textOpacity={textOpacity} 
          textTransform={textTransform} 
        />

        <FilesSection 
          filesOpacity={filesOpacity} 
          filesTransform={filesTransform} 
          onFileDownload={handleFileDownload} 
        />
      </main>
    </div>
  );
};

export default Dashboard;
