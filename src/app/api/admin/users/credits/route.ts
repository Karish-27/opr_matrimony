import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId, credits } = await req.json();
    
    if (!userId || credits === undefined || credits < 0) {
      return NextResponse.json({ 
        error: "Valid userId and credits (≥0) are required." 
      }, { status: 400 });
    }

    // Update user credits
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: { credits: Number(credits) },
      select: { 
        id: true, 
        firstName: true, 
        lastName: true, 
        credits: true 
      }
    });

    return NextResponse.json({
      success: true,
      message: `Credits updated successfully for ${updatedUser.firstName} ${updatedUser.lastName}`,
      user: updatedUser
    });

  } catch (error) {
    console.error('Update credits error:', error);
    
    // Handle user not found error
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json({ 
        error: "User not found." 
      }, { status: 404 });
    }
    
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
