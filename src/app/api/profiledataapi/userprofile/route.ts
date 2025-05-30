import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    console.log('Received data:', data); // Add this line
    const userProfile = await prisma.userProfile.create({
      data: {
        userId: Number(data.userId), // Ensure this is a number
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
    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('UserProfile create error:', error); // Add this line
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}