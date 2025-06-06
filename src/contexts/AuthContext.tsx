"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: string | null;
  user: any | null;
  hasChecked: boolean;
}

interface AuthContextType extends AuthState {
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    userId: null,
    user: null,
    hasChecked: false
  });
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        const userId = String(userData.user.id);
        
        // Sync localStorage with server
        localStorage.setItem('userId', userId);
        
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          userId: userId,
          user: userData.user,
          hasChecked: true
        });
      } else {
        // Server says not authenticated, clear everything
        localStorage.removeItem('userId');
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          userId: null,
          user: null,
          hasChecked: true
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('userId');
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        userId: null,
        user: null,
        hasChecked: true
      });
    }
  };

  const logout = async () => {
    try {
      // Clear client-side state immediately
      localStorage.removeItem('userId');
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        userId: null,
        user: null,
        hasChecked: true
      });

      // Call server logout endpoint to clear cookies
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always redirect to login regardless of API call success
      router.push('/auth/login');
    }
  };

  const refreshAuth = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true, hasChecked: false }));
    await checkAuth();
  };

  useEffect(() => {
    if (!authState.hasChecked) {
      checkAuth();
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      ...authState,
      logout,
      refreshAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

// Enhanced HOC using the context
export const withAuthContext = (WrappedComponent: React.ComponentType<any>) => {
  return function AuthenticatedComponent(props: any) {
    const { isAuthenticated, isLoading, hasChecked } = useAuthContext();
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
      if (hasChecked && !isLoading) {
        setShouldRender(isAuthenticated);
      }
    }, [hasChecked, isLoading, isAuthenticated]);

    if (isLoading || !hasChecked || !shouldRender) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {!hasChecked ? "Checking authentication..." : "Redirecting..."}
            </p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};
