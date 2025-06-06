import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Create response for successful logout
    const response = NextResponse.json({ 
      message: "Logout successful" 
    });    // Clear the userId cookie by setting it to expire immediately
    response.cookies.set('userId', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Match login cookie settings
      sameSite: 'lax',
      path: '/',
      maxAge: 0, // Expire immediately
      expires: new Date(0) // Set to past date
    });    // Clear the admin session cookie if it exists (now server-side)
    response.cookies.set('isAdmin', '', {
      httpOnly: true, // Admin cookie is now set server-side
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0, // Expire immediately
      expires: new Date(0) // Set to past date
    });

    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: "Internal server error during logout." },
      { status: 500 }
    );
  }
}
