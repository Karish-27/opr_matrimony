import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, context: { params: Promise<{ regNo: string }> }) {
  const { liked } = await req.json();
  const { regNo } = await context.params;
  console.log(`Updating like status for profile with regNo: ${regNo}, liked: ${liked}`);
  

  // Check if profile exists
  const profile = await prisma.profile.findUnique({ where: { regNo } });
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  // Update the liked field
  await prisma.profile.update({
    where: { regNo },
    data: { liked },
  });

  return NextResponse.json({ success: true });
}