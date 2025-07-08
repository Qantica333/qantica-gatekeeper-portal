
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useScrollAnimations } from '../hooks/useScrollAnimations';
import { useFileDownload } from '../hooks/useFileDownload';
import ProgressIndicator from './dashboard/ProgressIndicator';
import DashboardHeader from './dashboard/DashboardHeader';
import HeroSection from './dashboard/HeroSection';
import TitleSection from './dashboard/TitleSection';
import DescriptionSection from './dashboard/DescriptionSection';
import FilesSection from './dashboard/FilesSection';

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

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-black">
      <ProgressIndicator scrollProgress={scrollProgress} />
      
      <DashboardHeader userEmail={userEmail} onLogout={handleLogout} />

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
