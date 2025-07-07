
import React from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';
import Dashboard from '../components/Dashboard';
import DatabaseInspector from '../components/DatabaseInspector';

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Temporarily show database inspector for debugging
  // Remove this condition after debugging
  if (window.location.search.includes('debug')) {
    return <DatabaseInspector />;
  }

  return (
    <>
      {isAuthenticated ? <Dashboard /> : <LoginForm />}
    </>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
