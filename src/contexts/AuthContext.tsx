
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
      console.log('=== DEBUGGING SUPABASE CONNECTION ===');
      console.log('Attempting to login with email:', email);
      console.log('Supabase URL:', supabase.supabaseUrl);
      console.log('Supabase Key exists:', !!supabase.supabaseKey);
      
      // Test basic connectivity to Supabase
      const { data: connectionTest, error: connectionError } = await supabase
        .from('users')
        .select('*')
        .limit(1);
      
      console.log('Connection test result:', connectionTest);
      console.log('Connection test error:', connectionError);
      
      // Get total count of users in table
      const { count, error: countError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });
        
      console.log('Total users count:', count);
      console.log('Count error:', countError);
      
      // Get all users to see what's actually in the table
      const { data: allUsers, error: allUsersError } = await supabase
        .from('users')
        .select('*');
      
      console.log('All users in database:', allUsers);
      console.log('All users error:', allUsersError);
      
      // Now try the specific email query with detailed logging
      console.log('Searching for email (original):', email);
      console.log('Searching for email (lowercase):', email.toLowerCase());
      console.log('Searching for email (trimmed):', email.trim().toLowerCase());
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase().trim());

      console.log('Specific email query result:', data);
      console.log('Specific email query error:', error);
      
      // Try alternative query methods
      const { data: ilikeData, error: ilikeError } = await supabase
        .from('users')
        .select('*')
        .ilike('email', email.toLowerCase().trim());
        
      console.log('ILIKE query result:', ilikeData);
      console.log('ILIKE query error:', ilikeError);

      if (error) {
        console.error('Database query error:', error);
        setIsLoading(false);
        return false;
      }

      // Check if we got any results
      if (data && data.length > 0) {
        console.log('✅ Email found! User data:', data[0]);
        setIsAuthenticated(true);
        setUserEmail(email);
        
        // Store auth state in localStorage for persistence
        localStorage.setItem('qantica_auth', JSON.stringify({ email }));
        
        setIsLoading(false);
        return true;
      } else {
        console.log('❌ No matching email found in database');
        console.log('Available emails in database:', allUsers?.map(u => u.email));
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
