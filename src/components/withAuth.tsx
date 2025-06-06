"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getCurrentUserId } from '@/utils/auth';

interface WithAuthProps {
  [key: string]: any;
}

/**
 * Higher-Order Component that protects pages requiring authentication
 * @param WrappedComponent - The component to protect
 * @param redirectTo - Where to redirect if not authenticated (default: '/auth/login')
 */
function withAuth<T extends WithAuthProps>(
  WrappedComponent: React.ComponentType<T>,
  redirectTo: string = '/auth/login'
) {
  const AuthenticatedComponent = (props: T) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuth = () => {
        const authStatus = isAuthenticated();
        const userId = getCurrentUserId();
        
        if (!authStatus || !userId) {
          // Store current path for redirect after login
          const currentPath = window.location.pathname;
          const loginUrl = new URL(redirectTo, window.location.origin);
          loginUrl.searchParams.set('redirect', currentPath);
          router.replace(loginUrl.toString());
        } else {
          setAuthenticated(true);
        }
        setIsLoading(false);
      };

      // Check auth immediately
      checkAuth();
    }, [router]);

    // Show loading spinner while checking authentication
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#F98B1D]"></div>
        </div>
      );
    }

    // If not authenticated, don't render the component (redirect will happen)
    if (!authenticated) {
      return null;
    }

    // Render the protected component
    return <WrappedComponent {...props} />;
  };

  // Set display name for debugging
  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

  return AuthenticatedComponent;
}

export default withAuth;
