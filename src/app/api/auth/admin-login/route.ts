import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check for hardcoded admin credentials
    if (email.trim() === "admin@gmail.com" && password === "admin@123") {
      // Create response with admin authentication
      const response = NextResponse.json({
        message: "Admin login successful",
        user: {
          id: "admin",
          email: "admin@gmail.com",
          firstName: "Admin",
          lastName: "User"
        }
      });

      // Set admin session cookie (same as before but server-side)
      response.cookies.set('isAdmin', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      // Also set a userId cookie for compatibility with middleware
      response.cookies.set('userId', 'admin', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      return response;
    } else {
      return NextResponse.json(
        { error: "Invalid admin credentials" },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
