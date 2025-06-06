"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const RootRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const handleRedirect = async () => {
      // Additional client-side check for root path redirection
      // This ensures that even if server-side redirect fails, client-side will handle it
      if ((pathname === '/' || pathname === '') && !isRedirecting) {
        setIsRedirecting(true);
        console.log('Client-side root redirect triggered for path:', pathname);
        
        try {
          // First, try to determine redirect based on localStorage
          const userId = localStorage.getItem('userId');
          const isAuthenticated = userId && !isNaN(Number(userId)) && Number(userId) > 0;
          
          if (isAuthenticated) {
            console.log('User authenticated via localStorage, redirecting to profilelists');
            router.replace('/profilelists');
          } else {
            // Fallback: call API to determine proper redirect
            console.log('Checking authentication via API...');
            const response = await fetch('/api/redirect', {
              method: 'GET',
              credentials: 'include'
            });
            
            if (response.ok) {
              const data = await response.json();
              console.log('API redirect response:', data);
              router.replace(data.redirectUrl);
            } else {
              // Final fallback: redirect to homepage
              console.log('API call failed, defaulting to homepage');
              router.replace('/homepage');
            }
          }
        } catch (error) {
          console.error('Error in client-side redirect:', error);
          // Final fallback: redirect to homepage
          router.replace('/homepage');
        }
      }
    };

    // Add a small delay to ensure proper mounting
    const timer = setTimeout(handleRedirect, 100);
    
    return () => clearTimeout(timer);
  }, [pathname, router, isRedirecting]);

  // Return null as this component doesn't render anything
  return null;
};

export default RootRedirect;
