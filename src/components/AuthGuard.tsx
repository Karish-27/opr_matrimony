"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, fallback }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      // Check localStorage for userId
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        setIsAuthenticated(false);
        // Get current path to redirect back after login
        const currentPath = window.location.pathname + window.location.search;
        router.push(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
        return;
      }

      setIsAuthenticated(true);
    };

    checkAuth();
  }, [router]);

  // Show loading state
  if (isAuthenticated === null) {
    return (
      fallback || (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Checking authentication...</p>
          </div>
        </div>
      )
    );
  }

  // Show nothing if not authenticated (router.push will handle redirect)
  if (!isAuthenticated) {
    return null;
  }

  // Show children if authenticated
  return <>{children}</>;
};

export default AuthGuard;
