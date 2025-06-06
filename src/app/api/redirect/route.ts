import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // This API route serves as a backup redirect mechanism
  // It can be called if the main redirect mechanisms fail
  
  const userId = request.cookies.get('userId')?.value;
  const isAdminCookie = request.cookies.get('isAdmin')?.value === 'true';
  
  // Validate userId format if it exists
  const isValidUserId = userId && !isNaN(Number(userId)) && Number(userId) > 0;
  const isUserAuthenticated = isValidUserId;
  const isAdminAuthenticated = isAdminCookie;
  
  console.log('API Redirect called - Auth status:', {
    isUserAuthenticated,
    isAdminAuthenticated,
    userId
  });
  
  // Determine redirect URL based on authentication status
  let redirectUrl = '/homepage'; // Default for unauthenticated users
  
  if (isAdminAuthenticated) {
    redirectUrl = '/admin/Dashboard';
  } else if (isUserAuthenticated) {
    redirectUrl = '/profilelists';
  }
  
  // Return the redirect URL as JSON response
  return NextResponse.json({ 
    redirectUrl,
    authenticated: isUserAuthenticated || isAdminAuthenticated,
    userType: isAdminAuthenticated ? 'admin' : isUserAuthenticated ? 'user' : 'guest'
  });
}

export async function POST(request: NextRequest) {
  // Handle POST requests for redirect determination
  return GET(request);
}
