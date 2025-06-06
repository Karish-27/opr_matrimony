import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const userId = request.cookies.get('userId')?.value;
  const isAdminCookie = request.cookies.get('isAdmin')?.value === 'true';  const pathname = request.nextUrl.pathname;
  
  // Enhanced debug logging
  if (pathname === '/' || pathname === '' || pathname.startsWith('/admin/')) {
    console.log('=== MIDDLEWARE DEBUG ===');
    console.log('Pathname:', pathname);
    console.log('Full URL:', request.url);
    console.log('userId cookie:', userId);
    console.log('isAdmin cookie:', request.cookies.get('isAdmin')?.value);
    console.log('========================');
  }
  
  // Debug logging for admin routes
  if (pathname.startsWith('/admin/')) {
    console.log('Admin route accessed:', pathname);
    console.log('isAdmin cookie value:', request.cookies.get('isAdmin')?.value);
    console.log('isAdminAuthenticated:', isAdminCookie);
  }
  
  // Define public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/homepage',
    '/auth/login',
    '/auth/register',
    '/admin', // Admin login page is public
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/logout',
    '/api/auth/admin-login'
  ];

  // Define regular user protected routes
  const userProtectedRoutes = [
    '/profilelists',
    '/auth/userprofile',
    '/auth/userprofile/parentsinfo',
    '/auth/userprofile/parentsinfo/horoscopeprofile',
    '/profileDropdown',
    '/api/profilelists',
    '/api/profiledataapi'
  ];
  // Define admin protected routes
  const adminProtectedRoutes = [
    '/admin/Dashboard',
    '/admin/ManageUser',
    '/admin/MemberLists',
    '/admin/PaidUsers',
    '/admin/ProfileInfo',
    '/admin/profile',
    '/api/admin'
  ];
  // Allow access to static files and Next.js internal routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/icons') ||
    pathname.startsWith('/public')
  ) {
    return NextResponse.next();
  }
  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => {
    if (route === '/') {
      return pathname === '/' || pathname === '';
    }
    if (route === '/homepage') {
      return pathname === '/homepage';
    }
    if (route === '/admin') {
      return pathname === '/admin'; // Admin login page
    }
    return pathname.startsWith(route);
  });

  // Check if the current path is a user protected route
  const isUserProtectedRoute = userProtectedRoutes.some(route => pathname.startsWith(route));
  
  // Check if the current path is an admin protected route
  const isAdminProtectedRoute = adminProtectedRoutes.some(route => pathname.startsWith(route));
  
  // Validate userId format if it exists
  const isValidUserId = userId && !isNaN(Number(userId)) && Number(userId) > 0;
    // Check authentication status
  const isUserAuthenticated = isValidUserId;
  const isAdminAuthenticated = isAdminCookie;

  // Debug logging for all routes
  console.log('Middleware check:', {
    pathname,
    isPublicRoute,
    isUserProtectedRoute,
    isAdminProtectedRoute,
    isUserAuthenticated,
    isAdminAuthenticated
  });

  // Handle admin routes FIRST (most specific)
  if (isAdminProtectedRoute) {
    if (!isAdminAuthenticated) {
      console.log('Redirecting unauthenticated admin route to /admin');
      const adminLoginUrl = new URL('/admin', request.url);
      return NextResponse.redirect(adminLoginUrl);
    }
    // Admin is authenticated, allow access
    return NextResponse.next();
  }

  // Handle user routes
  if (isUserProtectedRoute) {
    if (!isUserAuthenticated) {
      console.log('Redirecting unauthenticated user route to /auth/login');
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname + request.nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }
    // User is authenticated, allow access
    return NextResponse.next();
  }

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If user is authenticated and trying to access auth pages, redirect appropriately
  if (pathname === '/auth/login' || pathname === '/auth/register') {
    if (isAdminAuthenticated) {
      return NextResponse.redirect(new URL('/admin/Dashboard', request.url));
    } else if (isUserAuthenticated) {
      return NextResponse.redirect(new URL('/profilelists', request.url));
    }
    // If not authenticated, allow access to login/register
    return NextResponse.next();
  }

  // If admin is trying to access admin login page when already authenticated
  if (pathname === '/admin' && isAdminAuthenticated) {
    return NextResponse.redirect(new URL('/admin/Dashboard', request.url));
  }
  // For any other unknown routes, check if it's an admin route first
  if (pathname !== '/') {
    // If it's an admin route (but not in protected list), redirect to admin login
    if (pathname.startsWith('/admin/')) {
      console.log('Redirecting unknown admin route to /admin');
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    // Otherwise, default to user login
    console.log('Redirecting unknown route to /auth/login');
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }
  // Handle root path redirects - this is the main logic for "/" and empty path
  if (pathname === '/' || pathname === '') {
    console.log('Root path accessed, determining redirect based on auth status');
    
    if (isAdminAuthenticated) {
      console.log('Admin authenticated, redirecting to admin dashboard');
      return NextResponse.redirect(new URL('/admin/Dashboard', request.url));
    } else if (isUserAuthenticated) {
      console.log('User authenticated, redirecting to profile lists');
      return NextResponse.redirect(new URL('/profilelists', request.url));
    } else {
      console.log('No authentication, redirecting to homepage');
      return NextResponse.redirect(new URL('/homepage', request.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)  
     * - favicon.ico (favicon file)
     * - images (public images)
     * - icons (public icons)
     * Also exclude file extensions like .png, .jpg, .css, .js, etc.
     */
    '/((?!_next/static|_next/image|favicon.ico|images|icons|.*\\..*$).*)',
  ],
};
