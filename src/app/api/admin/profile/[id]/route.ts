import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: { id: string } }) {
  const params = await context.params;
  let { id } = params;
  let userProfile = null;

  // Try numeric id
  if (!isNaN(Number(id))) {
    userProfile = await prisma.userProfile.findUnique({
      where: { id: Number(id) },
      include: {
        user: { include: { profile: true } },
        parentInfo: true,
        horoscopeProfile: true,
      },
    });
  } else {
    // Try regNo in Profile table
    userProfile = await prisma.userProfile.findFirst({
      where: {
        user: {
          profile: {
            regNo: id,
          },
        },
      },
      include: {
        user: { include: { profile: true } },
        parentInfo: true,
        horoscopeProfile: true,
      },
    });
  }

  if (!userProfile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const data = {
    regNo: userProfile.user?.profile?.regNo || `VKR${userProfile.id}`,
    name: `${userProfile.user?.firstName || ""} ${userProfile.user?.lastName || ""}`.trim(),
    email: userProfile.user?.email || "",
    phone: userProfile.phone || "",
    dob: userProfile.dob ? userProfile.dob.toISOString().split("T")[0] : "",
    age: userProfile.age,
    star: userProfile.horoscopeProfile?.starFoot || "",
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
    parentInfo: userProfile.parentInfo,
    horoscopeProfile: userProfile.horoscopeProfile,
  };

  return NextResponse.json(data);
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  // Correct: await context.params before using id (Next.js dynamic API requirement)
  const params = await context.params;
  const { id } = params;
  const body = await req.json();
  try {
    // Update UserProfile main fields
    const updatedProfile = await prisma.userProfile.update({
      where: { id: Number(id) },
      data: {
        phone: body.phone,
        dob: body.dob,
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
      },
      include: {
        user: { include: { profile: true } },
        parentInfo: true,
        horoscopeProfile: true,
      },
    });
    // Update User email if changed
    if (body.email && updatedProfile.user?.email !== body.email) {
      await prisma.user.update({
        where: { id: updatedProfile.userId },
        data: { email: body.email },
      });
    }
    return NextResponse.json({ ...updatedProfile, user: { ...updatedProfile.user, email: body.email } });
  } catch (error: unknown) {
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ error: 'Failed to update profile', details: message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
