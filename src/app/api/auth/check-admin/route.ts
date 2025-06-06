import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Check if admin session exists (for hardcoded admin login)
    const isAdminSession = req.cookies.get('isAdmin')?.value;
    
    if (isAdminSession === 'true') {
      return NextResponse.json({
        message: "Admin access granted",
        user: {
          id: 'admin',
          email: 'admin@gmail.com',
          firstName: 'Admin',
          lastName: 'User'
        },
        isAdmin: true
      });
    }

    // Fallback: Get userId from cookie for database users
    const userId = req.cookies.get('userId')?.value;
    
    if (!userId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Get user and check if they have admin privileges
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isActive: true,
      }
    });

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: "User not found or inactive" },
        { status: 401 }
      );
    }

    // Simple admin check - modify this based on your admin logic
    const adminEmails = [
      'admin@matrimony.com',
      'administrator@matrimony.com',
      'admin@gmail.com', // Add the hardcoded admin email
    ];
    
    const isAdmin = adminEmails.includes(user.email.toLowerCase()) || 
                   user.email.toLowerCase().includes('admin');

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Access denied. Admin privileges required." },
        { status: 403 }
      );
    }

    return NextResponse.json({
      message: "Admin access granted",
      user: user,
      isAdmin: true
    });

  } catch (error) {
    console.error('Admin check error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
