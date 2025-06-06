"use client";

import React from 'react';
import { useAuth, withAuth } from '@/hooks/useAuth';

interface ProtectedPageProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({ 
  children, 
  requireAuth = true, 
  redirectTo = '/auth/login' 
}) => {
  const { isAuthenticated, isLoading, user } = useAuth(requireAuth ? redirectTo : undefined);

  if (requireAuth && isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null; // The useAuth hook handles the redirect
  }

  return <>{children}</>;
};

export default ProtectedPage;
