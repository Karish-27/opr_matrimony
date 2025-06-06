import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Get userId from cookie
    const userId = req.cookies.get("userId")?.value;
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated. Please log in." }, { status: 401 });
    }

    const { profileUserId } = await req.json();
    
    if (!profileUserId) {
      return NextResponse.json({ error: "Profile user ID is required." }, { status: 400 });
    }

    // Get current user with credits
    const currentUser = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { credits: true }
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Check if user has already viewed this profile
    const existingView = await prisma.profileView.findUnique({
      where: {
        userId_profileId: {
          userId: Number(userId),
          profileId: Number(profileUserId)
        }
      }
    });

    // If already viewed, no credit deduction needed
    if (existingView) {
      return NextResponse.json({ 
        success: true, 
        message: "Profile already viewed",
        creditsRemaining: currentUser.credits 
      });
    }

    // Check if user has enough credits
    if (currentUser.credits <= 0) {
      return NextResponse.json({ 
        error: "Insufficient credits to view this profile.",
        creditsRemaining: 0 
      }, { status: 403 });
    }

    // Start transaction to deduct credit and record view
    const result = await prisma.$transaction(async (tx) => {
      // Deduct 1 credit from user
      const updatedUser = await tx.user.update({
        where: { id: Number(userId) },
        data: { credits: { decrement: 1 } },
        select: { credits: true }
      });

      // Record the profile view
      await tx.profileView.create({
        data: {
          userId: Number(userId),
          profileId: Number(profileUserId)
        }
      });

      return { creditsRemaining: updatedUser.credits };
    });    return NextResponse.json({
      success: true,
      message: "1 credit used. Profile viewed successfully",
      creditsRemaining: result.creditsRemaining
    });

  } catch (error) {
    console.error('Profile view error:', error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
