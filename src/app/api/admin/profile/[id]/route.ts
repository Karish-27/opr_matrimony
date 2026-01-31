import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let userProfile = null;

  // Try numeric id
  if (!isNaN(Number(id))) {
    userProfile = await prisma.userProfile.findUnique({
      where: { id: Number(id) },
      include: {
        profile: {
          include: {
            user: true,
            parentInfo: true,
            horoscopeProfile: true,
          },
        },
      },
    });
  } else {
    // Try regNo in Profile table
    userProfile = await prisma.userProfile.findFirst({
      where: {
        profile: {
          regNo: id,
        },
      },
      include: {
        profile: {
          include: {
            user: true,
            parentInfo: true,
            horoscopeProfile: true,
          },
        },
      },
    });
  }

  if (!userProfile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const data = {
    regNo: userProfile.profile?.regNo || `VKR${userProfile.id}`,
    name: `${userProfile.profile?.user?.firstName || ""} ${userProfile.profile?.user?.lastName || ""}`.trim(),
    email: userProfile.profile?.user?.email || "",
    phone: userProfile.phone || "",
    dob: userProfile.dob ? userProfile.dob.toISOString().split("T")[0] : "",
    age: userProfile.age,
    star: userProfile.profile?.horoscopeProfile?.starFoot || "",
    marriageStatus: userProfile.marriageStatus,
    height: userProfile.height,
    qualification: userProfile.education,
    color: userProfile.color,
    caste: userProfile.caste,
    familyProperty: userProfile.familyProperty,
    typeOfFood: userProfile.dietType,
    salary: userProfile.salary,
    career: userProfile.career,
    expectation: userProfile.expectation,
    profilePhotos: Array.isArray(userProfile.profilePhotos) ? userProfile.profilePhotos : [],
    parentInfo: userProfile.profile?.parentInfo,
    horoscopeProfile: userProfile.profile?.horoscopeProfile,
  };

  return NextResponse.json(data);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let body: any;
  
  try {
    body = await req.json();
    console.log('PUT request body:', body); // Add debugging
    
    // Update UserProfile main fields
    const updatedProfile = await prisma.userProfile.update({
      where: { id: Number(id) },
      data: {
        phone: body.phone,
        dob: body.dob ? new Date(body.dob + 'T00:00:00.000Z') : new Date(),
        age: Number(body.age),
        height: body.height,
        color: body.color,
        education: body.qualification,
        career: body.career,
        salary: body.salary,
        familyProperty: body.familyProperty,
        expectation: body.expectation,
        dietType: body.typeOfFood,
        marriageStatus: body.marriageStatus,
        caste: body.caste,
        type: body.type || 'User', // Add required type field with default
        profilePhotos: body.profilePhotos || [], // Add required profilePhotos field with default
      },
      include: {
        profile: {
          include: {
            user: true,
            parentInfo: true,
            horoscopeProfile: true,
          },
        },
      },
    });

    // Update User email if changed
    if (body.email && updatedProfile.profile?.user?.email !== body.email) {
      await prisma.user.update({
        where: { id: updatedProfile.profile.user.id },
        data: { email: body.email },
      });
      // Update the local object to reflect the new email
      updatedProfile.profile.user.email = body.email;
    }

    // Update horoscope documents if provided
    if (body.horoscopeProfile && updatedProfile.profile?.horoscopeProfile) {
      await prisma.horoscopeProfile.update({
        where: { id: updatedProfile.profile.horoscopeProfile.id },
        data: {
          horoscopeDocuments: body.horoscopeProfile.horoscopeDocuments || [],
        },
      });
      // Update the local object
      updatedProfile.profile.horoscopeProfile.horoscopeDocuments = body.horoscopeProfile.horoscopeDocuments || [];
    }

    return NextResponse.json(updatedProfile);
  } catch (error: unknown) {
    console.error('Error updating profile:', error); // Add detailed logging
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ 
      error: 'Failed to update profile', 
      details: message,
      requestBody: body // Include request body for debugging
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
