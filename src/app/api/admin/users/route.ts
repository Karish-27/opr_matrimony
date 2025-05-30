import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get all user profiles and join Profile to get regNo
    const userProfiles = await prisma.userProfile.findMany({
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    // Map to required fields
    const users = userProfiles.map((up) => ({
      regNo: up.user?.profile?.regNo || `VKR${up.id}`,
      name: `${up.user?.firstName || ""} ${up.user?.lastName || ""}`.trim(),
      email: up.user?.email || "",
      avatar:
        Array.isArray(up.profilePhotos) && up.profilePhotos.length > 0
          ? up.profilePhotos[0]
          : "/images/profilepicture.png",
      mobile: up.phone || "",
    }));

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
