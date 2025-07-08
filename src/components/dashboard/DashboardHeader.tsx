
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface DashboardHeaderProps {
  userEmail: string | null;
  onLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userEmail, onLogout }) => {
  return (
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
            onClick={onLogout}
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
  );
};

export default DashboardHeader;
