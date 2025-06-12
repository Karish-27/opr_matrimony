import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  // Count total profiles
  const totalProfiles = await prisma.userProfile.count();
  // Count male profiles (type: 'groom')
  const totalMaleProfiles = await prisma.userProfile.count({
    where: { type: 'groom' },
  });
  // Count female profiles (type: 'bride')
  const totalFemaleProfiles = await prisma.userProfile.count({
    where: { type: 'bride' },
  });
  // Count total paid users from Payment table
  const totalPaidUsers = await prisma.payment.count();

  return NextResponse.json({
    totalProfiles,
    totalMaleProfiles,
    totalFemaleProfiles,
    totalPaidUsers,
  });
}
