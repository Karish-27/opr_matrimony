import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, context: { params: Promise<{ regNo: string }> }) {
  try {
    const { liked } = await req.json();
    const { regNo } = await context.params;
    console.log(`Updating like status for profile with regNo: ${regNo}, liked: ${liked}`);
    
    // Check if profile exists
    const profile = await prisma.profile.findUnique({ where: { regNo } });
    if (!profile) {
      console.log(`Profile with regNo ${regNo} not found`);
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Update the liked field
    const updatedProfile = await prisma.profile.update({
      where: { regNo },
      data: { liked },
    });

    console.log(`Successfully updated profile ${regNo} liked status to: ${liked}`);
    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error("Error updating like status:", error);
    const errorMessage = (error instanceof Error) ? error.message : String(error);
    return NextResponse.json({ error: "Failed to update like status", details: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}