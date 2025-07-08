
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const result = isSignup 
        ? await signup(email, password)
        : await login(email, password);

      if (!result.success) {
        setError(result.error || 'Authentication failed');
      } else if (isSignup) {
        setError('Please check your email to verify your account before logging in.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            <span className="text-yellow-400">Q</span>ANTICA
          </h1>
        </div>
        
        <Card className="bg-yellow-400 border-yellow-400 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-black text-xl">
              {isSignup ? 'Create Account' : 'Access Portal'}
            </CardTitle>
            <CardDescription className="text-gray-800">
              {isSignup ? 'Sign up for access' : 'Enter your credentials to continue'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-gray-600"
                />
              </div>
              
              <div>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-gray-600"
                />
              </div>
              
              {error && (
                <div className="text-red-600 text-sm text-center bg-red-100 p-2 rounded border border-red-300">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-black hover:bg-gray-800 text-white font-medium transition-all duration-200"
              >
                {isLoading ? 'Please wait...' : (isSignup ? 'Sign Up' : 'Sign In')}
              </Button>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-gray-800 hover:text-black underline text-sm"
                >
                  {isSignup ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
