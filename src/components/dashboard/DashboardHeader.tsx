
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface DashboardHeaderProps {
  userEmail: string | null;
  onLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userEmail, onLogout }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white">
            <span className="text-yellow-400">Q</span>ANTICA
          </h1>
          {userEmail && (
            <span className="text-gray-300 text-sm">
              Welcome, {userEmail}
            </span>
          )}
        </div>
        
        <Button
          onClick={onLogout}
          variant="outline"
          size="sm"
          className="bg-transparent border-gray-600 text-white hover:bg-gray-800"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
