import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  // Get userId from cookie (not from request body)
  const userId = req.cookies.get('userId')?.value;
  
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated. Please log in." }, { status: 401 });
  }

  // Check if this is an admin user
  if (userId === "admin") {
    return NextResponse.json({ 
      error: "Admin users cannot create user profiles. This endpoint is for regular users only." 
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
  try {
    console.log('Received data:', data);
    console.log('User ID from cookie:', userId);
    
    const userProfile = await prisma.userProfile.create({
      data: {
        userId: userIdNumber, // Use validated numeric userId
        type: data.type,
        dietType: data.dietType,
        dob: new Date(data.dob),
        age: Number(data.age),
        height: data.height,
        color: data.color,
        education: data.education,
        career: data.career,
        salary: data.salary,
        familyProperty: data.familyProperty,
        expectation: data.expectation,
        phone: data.phone,
        caste: data.caste,
        marriageStatus: data.marriageStatus,
        profilePhotos: data.profilePhotos || []
      },
    });

    console.log('Stored userProfile in DB:', userProfile);
    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('UserProfile create error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
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
      error: "Admin users do not have user profiles. This endpoint is for regular users only." 
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
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId: userIdNumber },
    });
    if (!userProfile) {
      return NextResponse.json({ error: "UserProfile not found" }, { status: 404 });
    }
    return NextResponse.json(userProfile);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}