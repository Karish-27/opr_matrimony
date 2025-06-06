import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    // Check if this is an admin user
    if (userId === "admin") {
      return NextResponse.json(
        { error: "Admin users cannot sync sessions. Please use admin authentication flow." },
        { status: 403 }
      );
    }

    // Convert userId to number and validate
    const userIdNumber = Number(userId);
    if (isNaN(userIdNumber)) {
      return NextResponse.json(
        { error: "Invalid userId format" },
        { status: 400 }
      );
    }

    // Verify the user exists and is active
    const user = await prisma.user.findUnique({
      where: { id: userIdNumber },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isActive: true
      }
    });

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: "User not found or inactive" },
        { status: 401 }
      );
    }

    // Create response and set cookie
    const response = NextResponse.json({ 
      message: "Session synced successfully",
      user: user
    });
    
    // Set a secure cookie with the user ID (same settings as login)
    response.cookies.set('userId', String(user.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
    
    return response;

  } catch (error) {
    console.error('Session sync error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
