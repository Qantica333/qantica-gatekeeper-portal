
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
      console.log('Attempting to login with email:', email);
      
      // First, let's check if we can connect to the database at all
      const { data: allUsers, error: allUsersError } = await supabase
        .from('users')
        .select('email')
        .limit(10);
      
      console.log('All users in database:', allUsers);
      console.log('Database connection error:', allUsersError);
      
      // Query the users table to check if email exists
      const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('email', email.toLowerCase());

      console.log('Query result for email:', email.toLowerCase());
      console.log('Query data:', data);
      console.log('Query error:', error);

      if (error) {
        console.log('Database query error:', error);
        setIsLoading(false);
        return false;
      }

      // Check if we got any results
      if (data && data.length > 0) {
        // Email found in database, authenticate user
        console.log('Email found, authenticating user');
        setIsAuthenticated(true);
        setUserEmail(email);
        
        // Store auth state in localStorage for persistence
        localStorage.setItem('qantica_auth', JSON.stringify({ email }));
        
        setIsLoading(false);
        return true;
      } else {
        console.log('No matching email found in database');
        setIsLoading(false);
        return false;
      }
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
