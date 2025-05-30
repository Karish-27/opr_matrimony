import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

console.log("ParentInfo API route file loaded"); // Log when file is loaded

const prisma = new PrismaClient();

// export async function POST() {
//   // Simple test endpoint to check if route is reachable
//   return NextResponse.json({ success: true, message: "ParentInfo API is reachable" });
// }

export async function POST(req: NextRequest) {
  console.log("POST /api/profiledataapi/userprofile/parentsinfo called"); // Log at top
  const data = await req.json();
  try {
    console.log("Received data:", data); // Log incoming data

    // Check if UserProfile exists for the given userId
    const userProfile = await prisma.userProfile.findUnique({
      where: { id: Number(data.userId) },
    });
    if (!userProfile) {
      return NextResponse.json(
        { error: `UserProfile not found for userId: ${data.userId}` },
        { status: 400 }
      );
    }

    const parentInfo = await prisma.parentInfo.create({
      data: {
        userId: Number(data.userId),
        fatherName: data.fatherName,
        motherName: data.motherName,
        fatherNative: data.fatherNative,
        motherNative: data.motherNative,
        fatherProfession: data.fatherProfession,
        motherProfession: data.motherProfession,
        phone: data.phone,
        address: data.address,
        brothers: Number(data.brothers),
        elderBrothers: Number(data.elderBrothers),
        youngerBrothers: Number(data.youngerBrothers),
        marriedBrothers: Number(data.marriedBrothers),
        sisters: Number(data.sisters),
        elderSisters: Number(data.elderSisters),
        youngerSisters: Number(data.youngerSisters),
        marriedSisters: Number(data.marriedSisters),
      },
    });

    // const parentInfo = await prisma.parentInfo.upsert({
    //   where: { userProfileId: Number(data.userId) },
    //   update: {
    //     fatherName: data.fatherName,
    //     motherName: data.motherName,
    //     fatherNative: data.fatherNative,
    //     motherNative: data.motherNative,
    //     fatherProfession: data.fatherProfession,
    //     motherProfession: data.motherProfession,
    //     phone: data.phone,
    //     address: data.address,
    //     brothers: Number(data.brothers),
    //     elderBrothers: Number(data.elderBrothers),
    //     youngerBrothers: Number(data.youngerBrothers),
    //     marriedBrothers: Number(data.marriedBrothers),
    //     sisters: Number(data.sisters),
    //     elderSisters: Number(data.elderSisters),
    //     youngerSisters: Number(data.youngerSisters),
    //     marriedSisters: Number(data.marriedSisters),
    //   },
    //   create: {
    //     userProfileId: Number(data.userId),
    //     fatherName: data.fatherName,
    //     motherName: data.motherName,
    //     fatherNative: data.fatherNative,
    //     motherNative: data.motherNative,
    //     fatherProfession: data.fatherProfession,
    //     motherProfession: data.motherProfession,
    //     phone: data.phone,
    //     address: data.address,
    //     brothers: Number(data.brothers),
    //     elderBrothers: Number(data.elderBrothers),
    //     youngerBrothers: Number(data.youngerBrothers),
    //     marriedBrothers: Number(data.marriedBrothers),
    //     sisters: Number(data.sisters),
    //     elderSisters: Number(data.elderSisters),
    //     youngerSisters: Number(data.youngerSisters),
    //     marriedSisters: Number(data.marriedSisters),
    //   },
    // });

    return NextResponse.json(parentInfo);
  } catch (error) {
    console.error("Error in parentInfo API:", error); // Log error
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  console.log("GET /api/profiledataapi/userprofile/parentsinfo called"); // Log at top
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const parentInfo = await prisma.parentInfo.findUnique({
      where: { userId: Number(userId) },
    });

    if (!parentInfo) {
      return NextResponse.json({ error: "Parent info not found" }, { status: 404 });
    }

    return NextResponse.json(parentInfo);
  } catch (error) {
    console.error("Error fetching parent info:", error); // Log error
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

