"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: string | null;
  user: any | null;
}

export const useAuth = (redirectTo?: string) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    userId: null,
    user: null
  });
  const router = useRouter();
  const [hasChecked, setHasChecked] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First, verify with server that the user is authenticated (most reliable)
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
            user: userData.user
          });
          setHasChecked(true);
        } else {
          // Server says not authenticated, check if we have userId in localStorage
          const localUserId = localStorage.getItem('userId');
          if (localUserId) {
            // Try to sync localStorage userId to cookies
            try {
              const syncResponse = await fetch('/api/auth/sync-session', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: localUserId }),
                credentials: 'include',
              });

              if (syncResponse.ok) {
                const syncData = await syncResponse.json();
                setAuthState({
                  isAuthenticated: true,
                  isLoading: false,
                  userId: localUserId,
                  user: syncData.user
                });
                setHasChecked(true);
                return; // Successfully synced
              }
            } catch (syncError) {
              console.error('Failed to sync localStorage to cookies:', syncError);
            }
          }
          
          // Clear everything if sync failed or no localStorage userId
          localStorage.removeItem('userId');
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
            userId: null,
            user: null
          });
          setHasChecked(true);
          
          if (redirectTo) {
            router.push(redirectTo);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('userId'); // Clear localStorage on error
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          userId: null,
          user: null
        });
        setHasChecked(true);
        
        if (redirectTo) {
          router.push(redirectTo);
        }
      }
    };

    if (!hasChecked) {
      checkAuth();
    }
  }, [router, redirectTo, hasChecked]);
  const logout = async () => {
    try {
      // Clear client-side state immediately
      localStorage.removeItem('userId');
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        userId: null,
        user: null
      });
      setHasChecked(true);

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
  return {
    ...authState,
    logout,
    hasChecked
  };
};

// Protected page wrapper component
export const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return function AuthenticatedComponent(props: any) {
    const { isAuthenticated, isLoading, hasChecked } = useAuth('/auth/login');
    const [shouldRender, setShouldRender] = useState(false);

    // Only allow rendering after authentication check is complete and user is authenticated
    useEffect(() => {
      if (hasChecked && !isLoading) {
        setShouldRender(isAuthenticated);
      }
    }, [hasChecked, isLoading, isAuthenticated]);

    // Show loading while checking authentication
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

// Admin-only wrapper component
export const withAdminAuth = (WrappedComponent: React.ComponentType<any>) => {
  return function AdminAuthenticatedComponent(props: any) {
    const { isAuthenticated, isLoading, user, hasChecked } = useAuth('/auth/login');
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [adminChecked, setAdminChecked] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const router = useRouter();

    useEffect(() => {
      if (isAuthenticated && user && hasChecked && !adminChecked) {
        // Check if user has admin privileges
        const checkAdminStatus = async () => {
          try {
            const response = await fetch('/api/auth/check-admin', {
              credentials: 'include',
            });
            
            if (response.ok) {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
              router.push('/profilelists'); // Redirect non-admin users
            }
          } catch (error) {
            setIsAdmin(false);
            router.push('/profilelists');
          } finally {
            setAdminChecked(true);
          }
        };

        checkAdminStatus();
      } else if (!isAuthenticated && hasChecked) {
        setAdminChecked(true);
      }
    }, [isAuthenticated, user, router, hasChecked, adminChecked]);

    // Only allow rendering after all checks are complete and user is admin
    useEffect(() => {
      if (hasChecked && adminChecked && !isLoading) {
        setShouldRender(isAuthenticated && isAdmin === true);
      }
    }, [hasChecked, adminChecked, isLoading, isAuthenticated, isAdmin]);

    // Show loading while checking authentication or admin status
    if (isLoading || !hasChecked || !adminChecked || !shouldRender) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {!hasChecked ? "Checking authentication..." : 
               !adminChecked ? "Checking permissions..." : "Redirecting..."}
            </p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};
