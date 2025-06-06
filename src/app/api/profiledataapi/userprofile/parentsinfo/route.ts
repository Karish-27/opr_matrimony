import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

console.log("ParentInfo API route file loaded"); // Log when file is loaded

const prisma = new PrismaClient();

// export async function POST() {
//   // Simple test endpoint to check if route is reachable
//   return NextResponse.json({ success: true, message: "ParentInfo API is reachable" });
// }

export async function POST(req: NextRequest) {
  console.log("POST /api/profiledataapi/userprofile/parentsinfo called");
  
  // Get userId from cookie (not from request body)
  const userId = req.cookies.get('userId')?.value;
  
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated. Please log in." }, { status: 401 });
  }

  // Check if this is an admin user
  if (userId === "admin") {
    return NextResponse.json({ 
      error: "Admin users cannot create parent info. This endpoint is for regular users only." 
    }, { status: 403 });
  }

  // Convert userId to number and validate
  const userIdNumber = Number(userId);
  if (isNaN(userIdNumber)) {
    return NextResponse.json({ 
      error: "Invalid user ID format. Please log in again." 
    }, { status: 400 });
  }

  const data = await req.json();
  console.log("Request body:", data);
  console.log('User ID from cookie:', userId);

  try {
    console.log("Received data:", data);

    // Check if UserProfile exists for the given userId
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId: userIdNumber },
    });
    console.log("Looking for userId:", userId, typeof userId);
    if (!userProfile) {
      return NextResponse.json(
        { error: `UserProfile not found for userId: ${userId}` },
        { status: 400 }
      );
    }
    const parentInfo = await prisma.parentInfo.create({
      data: {
        userId: Number(userId),
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
    return NextResponse.json(parentInfo);
  } catch (error) {
    console.error("Error in parentInfo API:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Get userId from cookie
  const userId = req.cookies.get('userId')?.value;

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated. Please log in." }, { status: 401 });
  }

  // Check if this is an admin user
  if (userId === "admin") {
    return NextResponse.json({ 
      error: "Admin users do not have parent info. This endpoint is for regular users only." 
    }, { status: 403 });
  }

  // Convert userId to number and validate
  const userIdNumber = Number(userId);
  if (isNaN(userIdNumber)) {
    return NextResponse.json({ 
      error: "Invalid user ID format. Please log in again." 
    }, { status: 400 });
  }

  try {
    const parentInfo = await prisma.parentInfo.findUnique({
      where: { userId: userIdNumber },
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

