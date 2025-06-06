import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId, isActive } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Update user status in User table
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: { isActive: Boolean(isActive) },
    });

    return NextResponse.json({ 
      success: true, 
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user: {
        id: updatedUser.id,
        isActive: updatedUser.isActive
      }
    });

  } catch (error) {
    console.error('Error toggling user status:', error);
    return NextResponse.json({ error: "Failed to update user status" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
