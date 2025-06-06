import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Get userId from cookie
    const userId = req.cookies.get('userId')?.value;
    
    if (!userId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Handle admin case
    if (userId === 'admin') {
      const isAdminCookie = req.cookies.get('isAdmin')?.value;
      if (isAdminCookie === 'true') {
        return NextResponse.json({
          message: "Authenticated",
          user: {
            id: 'admin',
            email: 'admin@gmail.com',
            firstName: 'Admin',
            lastName: 'User',
            isActive: true
          }
        });
      } else {
        return NextResponse.json(
          { error: "Not authenticated" },
          { status: 401 }
        );
      }
    }

    // Verify regular user exists and is active
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
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

    return NextResponse.json({
      message: "Authenticated",
      user: user
    });

  } catch (error) {
    console.error('Auth verification error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
