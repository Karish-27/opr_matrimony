// Authentication utility functions for client-side use

/**
 * Check if user is authenticated by verifying the presence of userId cookie
 * @returns boolean indicating if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') {
    return false; // Server-side rendering
  }
  
  // Check for userId in both localStorage and cookies
  const userIdLocal = localStorage.getItem('userId');
  const userIdCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('userId='))
    ?.split('=')[1];
  
  return !!(userIdLocal || userIdCookie);
}

/**
 * Get the current user ID from localStorage or cookies
 * @returns string | null
 */
export function getCurrentUserId(): string | null {
  if (typeof window === 'undefined') {
    return null; // Server-side rendering
  }
  
  // First try localStorage
  const userIdLocal = localStorage.getItem('userId');
  if (userIdLocal) {
    return userIdLocal;
  }
  
  // Fallback to cookie
  const userIdCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('userId='))
    ?.split('=')[1];
  
  return userIdCookie || null;
}

/**
 * Clear authentication data on logout
 */
export function clearAuth(): void {
  if (typeof window === 'undefined') {
    return; // Server-side rendering
  }
  
  // Clear localStorage
  localStorage.removeItem('userId');
  
  // Clear cookie by setting it to expire
  document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

/**
 * Logout user by calling logout API and clearing authentication data
 */
export async function logout(): Promise<void> {
  if (typeof window === 'undefined') {
    return; // Server-side rendering
  }

  try {
    // Call logout API to clear server-side cookie
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include', // Include cookies in request
    });
  } catch (error) {
    console.error('Logout API error:', error);
    // Continue with client-side cleanup even if API fails
  } finally {
    // Clear client-side authentication data
    clearAuth();
    
    // Check if we're on admin pages and redirect accordingly
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/admin')) {
      // Redirect to admin login page
      window.location.href = '/admin';
    } else {
      // Redirect to regular login page
      window.location.href = '/auth/login';
    }
  }
}

/**
 * Redirect to login page if not authenticated
 * @param currentPath - current path to redirect back to after login
 */
export function requireAuth(currentPath?: string): void {
  if (typeof window === 'undefined') {
    return; // Server-side rendering
  }
  
  if (!isAuthenticated()) {
    const loginUrl = new URL('/auth/login', window.location.origin);
    if (currentPath) {
      loginUrl.searchParams.set('redirect', currentPath);
    }
    window.location.href = loginUrl.toString();
  }
}

/**
 * Store userId in localStorage (for registration flow)
 */
export function setUserIdInLocalStorage(userId: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userId', userId);
  }
}

/**
 * Syncs userId from localStorage to cookies by calling an API endpoint
 * This is useful when a user has userId in localStorage but needs it in cookies
 */
export async function syncUserIdToCookies(): Promise<boolean> {
  const userId = getCurrentUserId();
  
  if (!userId) {
    return false;
  }

  // Don't sync admin users - they use a different authentication flow
  if (userId === "admin") {
    console.log("Admin users don't need session sync");
    return false;
  }

  try {
    const response = await fetch('/api/auth/sync-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
      credentials: 'include',
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to sync userId to cookies:', error);
    return false;
  }
}
