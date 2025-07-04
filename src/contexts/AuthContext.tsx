
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on mount
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const storedAuth = localStorage.getItem('qantica_auth');
    if (storedAuth) {
      const { email } = JSON.parse(storedAuth);
      setIsAuthenticated(true);
      setUserEmail(email);
    }
    setIsLoading(false);
  };

  const login = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Query the users table to check if email exists
      const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('email', email.toLowerCase())
        .single();

      if (error) {
        console.log('Email not found in database:', error);
        setIsLoading(false);
        return false;
      }

      if (data) {
        // Email found in database, authenticate user
        setIsAuthenticated(true);
        setUserEmail(email);
        
        // Store auth state in localStorage for persistence
        localStorage.setItem('qantica_auth', JSON.stringify({ email }));
        
        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (err) {
      console.error('Login error:', err);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    localStorage.removeItem('qantica_auth');
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      userEmail,
      login,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
