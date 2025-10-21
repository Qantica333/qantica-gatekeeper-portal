
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<boolean>;
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

// Rate limiting implementation
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

const getRateLimitKey = (email: string) => `login_attempts_${email}`;

const isRateLimited = (email: string): boolean => {
  const key = getRateLimitKey(email);
  const stored = localStorage.getItem(key);
  
  if (!stored) return false;
  
  const { attempts, timestamp } = JSON.parse(stored);
  const now = Date.now();
  
  // Reset if window has passed
  if (now - timestamp > RATE_LIMIT_WINDOW) {
    localStorage.removeItem(key);
    return false;
  }
  
  return attempts >= MAX_ATTEMPTS;
};

const recordLoginAttempt = (email: string) => {
  const key = getRateLimitKey(email);
  const stored = localStorage.getItem(key);
  const now = Date.now();
  
  if (!stored) {
    localStorage.setItem(key, JSON.stringify({ attempts: 1, timestamp: now }));
    return;
  }
  
  const { attempts, timestamp } = JSON.parse(stored);
  
  // Reset if window has passed
  if (now - timestamp > RATE_LIMIT_WINDOW) {
    localStorage.setItem(key, JSON.stringify({ attempts: 1, timestamp: now }));
  } else {
    localStorage.setItem(key, JSON.stringify({ attempts: attempts + 1, timestamp }));
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  const login = async (email: string, password: string): Promise<boolean> => {
    const trimmedEmail = email.toLowerCase().trim();
    
    // Check rate limiting
    if (isRateLimited(trimmedEmail)) {
      return false;
    }
    
    setIsLoading(true);
    
    try {
      // Simple password check - you can replace this with your actual password
      const MASTER_PASSWORD = 'QIP';
      
      if (password !== MASTER_PASSWORD) {
        recordLoginAttempt(trimmedEmail);
        setIsLoading(false);
        return false;
      }

      setIsAuthenticated(true);
      setUserEmail(trimmedEmail);
      localStorage.setItem('qantica_auth', JSON.stringify({ email: trimmedEmail }));
      
      setIsLoading(false);
      return true;
    } catch (err) {
      recordLoginAttempt(trimmedEmail);
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
