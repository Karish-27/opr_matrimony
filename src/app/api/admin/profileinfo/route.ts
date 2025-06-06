// import { NextResponse } from "next/server";
// import { PrismaClient } from "@/generated/prisma";

// const prisma = new PrismaClient();

// export async function GET() {
//   const profiles = await prisma.userProfile.findMany({
//     include: {
//       parentInfo: true,
//       horoscopeProfile: true,
//       user: true,
//     },
//   });

//   const mappedProfiles = profiles.map((profile: any) => ({
//     name: `${profile.user.firstName} ${profile.user.lastName}`,
//     regNo: `VKR${profile.id}`,
//     email: profile.user.email,
//     phone: profile.phone,
//     dob: profile.dob.toISOString().split("T")[0],
//     age: profile.age,
//     star: profile.horoscopeProfile?.starFoot || "",
//     marriageStatus: profile.marriageStatus,
//     height: profile.height,
//     color: profile.color,
//     caste: profile.caste,
//     qualification: profile.education,
//     familyProperty: profile.familyProperty,
//     typeOfFood: profile.dietType,
//     career: profile.career,
//     salary: profile.salary,
//     expectation: profile.expectation,
//     image: Array.isArray(profile.profilePhotos) && profile.profilePhotos.length > 0
//       ? profile.profilePhotos[0]
//       : "/images/profilepicture.png",
//     gallery: Array.isArray(profile.profilePhotos)
//       ? profile.profilePhotos
//       : [],
//     family: profile.parentInfo
//       ? {
//           fatherName: profile.parentInfo.fatherName,
//           motherName: profile.parentInfo.motherName,
//           fatherNative: profile.parentInfo.fatherNative,
//           motherNative: profile.parentInfo.motherNative,
//           fatherProfession: profile.parentInfo.fatherProfession,
//           motherProfession: profile.parentInfo.motherProfession,
//           phoneNumber: profile.parentInfo.phone,
//           address: profile.parentInfo.address,
//           brothers: profile.parentInfo.brothers,
//           sisters: profile.parentInfo.sisters,
//           elderBrother: profile.parentInfo.elderBrothers,
//           youngerBrother: profile.parentInfo.youngerBrothers,
//           marriedBrother: profile.parentInfo.marriedBrothers,
//           elderSister: profile.parentInfo.elderSisters,
//           youngerSister: profile.parentInfo.youngerSisters,
//           marriedSister: profile.parentInfo.marriedSisters,
//         }
//       : {},
//     horoscope: profile.horoscopeProfile
//       ? {
//           zodiacSign: profile.horoscopeProfile.zodiacSign,
//           tamilYear: profile.horoscopeProfile.tamilYear,
//           tamilMonth: profile.horoscopeProfile.tamilMonth,
//           udayathiNatchat: profile.horoscopeProfile.udayathiNatchat,
//           day: profile.horoscopeProfile.day,
//           birthTime: profile.horoscopeProfile.birthTime,
//           starFoot: profile.horoscopeProfile.starFoot,
//           ascendant: profile.horoscopeProfile.ascendant,
//           birthplace: profile.horoscopeProfile.birthplace,
//           natalDirection: profile.horoscopeProfile.natalDirection,
//         }
//       : {},
//     chart: [],
//   }));

//   return NextResponse.json(mappedProfiles);
// }

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  // Get userId from cookie
  const userId = req.cookies.get("userId")?.value;
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated. Please log in." }, { status: 401 });
  }

  // Check if this is an admin user
  if (userId === "admin") {
    return NextResponse.json({ 
      error: "Admin users do not have profile info. This endpoint is for regular users only." 
    }, { status: 403 });
  }

  // Convert userId to number and validate
  const userIdNumber = Number(userId);
  if (isNaN(userIdNumber)) {
    return NextResponse.json({ 
      error: "Invalid user ID format. Please log in again." 
    }, { status: 400 });
  }

  // Get userProfile for this userId
  const userProfile = await prisma.userProfile.findUnique({
    where: { userId: userIdNumber },
  });
  if (!userProfile) {
    return NextResponse.json({ error: "UserProfile not found" }, { status: 404 });
  }
  // Get parentInfo for this userId
  const parentInfo = await prisma.parentInfo.findUnique({
    where: { userId: userIdNumber },
  });

  // Get horoscopeProfile for this userId
  const horoscopeProfile = await prisma.horoscopeProfile.findUnique({
    where: { userId: userIdNumber },
  });
  // Get user (for name/email)
  const user = await prisma.user.findUnique({
    where: { id: userIdNumber },
  });

  const mappedProfile = {
    name: user ? `${user.firstName} ${user.lastName}` : "",
    regNo: `VKR${userProfile.id}`,
    email: user?.email || "",
    gender: userProfile.type || "",
    phone: userProfile.phone,
    dob: userProfile.dob.toISOString().split("T")[0],
    age: userProfile.age,
    star: horoscopeProfile?.starFoot || "",
    marriageStatus: userProfile.marriageStatus,
    height: userProfile.height,
    color: userProfile.color,
    caste: userProfile.caste,
    qualification: userProfile.education,
    familyProperty: userProfile.familyProperty,
    typeOfFood: userProfile.dietType,
    career: userProfile.career,
    salary: userProfile.salary,
    expectation: userProfile.expectation,
    image: Array.isArray(userProfile.profilePhotos) && userProfile.profilePhotos.length > 0
      ? userProfile.profilePhotos[0]
      : "/images/profilepicture.png",
    gallery: Array.isArray(userProfile.profilePhotos)
      ? userProfile.profilePhotos
      : [],
    family: parentInfo
      ? {
          fatherName: parentInfo.fatherName,
          motherName: parentInfo.motherName,
          fatherNative: parentInfo.fatherNative,
          motherNative: parentInfo.motherNative,
          fatherProfession: parentInfo.fatherProfession,
          motherProfession: parentInfo.motherProfession,
          phoneNumber: parentInfo.phone,
          address: parentInfo.address,
          brothers: parentInfo.brothers,
          sisters: parentInfo.sisters,
          elderBrother: parentInfo.elderBrothers,
          youngerBrother: parentInfo.youngerBrothers,
          marriedBrother: parentInfo.marriedBrothers,
          elderSister: parentInfo.elderSisters,
          youngerSister: parentInfo.youngerSisters,
          marriedSister: parentInfo.marriedSisters,
        }
      : {},
    horoscope: horoscopeProfile
      ? {
          zodiacSign: horoscopeProfile.zodiacSign,
          tamilYear: horoscopeProfile.tamilYear,
          tamilMonth: horoscopeProfile.tamilMonth,
          udayathiNatchat: horoscopeProfile.udayathiNatchat,
          day: horoscopeProfile.day,
          birthTime: horoscopeProfile.birthTime,
          starFoot: horoscopeProfile.starFoot,
          ascendant: horoscopeProfile.ascendant,
          birthplace: horoscopeProfile.birthplace,
          natalDirection: horoscopeProfile.natalDirection,
        }
      : {},
    chart: [],
  };

  return NextResponse.json(mappedProfile);
}

export async function PUT(req: NextRequest) {
  const userId = req.cookies.get("userId")?.value;
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated. Please log in." }, { status: 401 });
  }
  const body = await req.json();

  // Update userProfile main fields
  const updatedProfile = await prisma.userProfile.update({
    where: { userId: Number(userId) },
    data: {
      phone: body.phone,
      dob: body.dob ? new Date(body.dob) : undefined,
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
      profilePhotos: body.gallery || body.profilePhotos || [],
    },
  });

  // Update User fields if changed
  if (body.email || body.name) {
    const nameParts = (body.name || '').split(' ');
    await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        email: body.email,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
      },
    });
  }

  // Update ParentInfo if present
  if (body.family) {
    await prisma.parentInfo.upsert({
      where: { userId: Number(userId) },
      update: {
        fatherName: body.family.fatherName,
        motherName: body.family.motherName,
        fatherNative: body.family.fatherNative,
        motherNative: body.family.motherNative,
        fatherProfession: body.family.fatherProfession,
        motherProfession: body.family.motherProfession,
        phone: body.family.phoneNumber,
        address: body.family.address,
        brothers: body.family.brothers,
        sisters: body.family.sisters,
        elderBrothers: body.family.elderBrother,
        youngerBrothers: body.family.youngerBrother,
        marriedBrothers: body.family.marriedBrother,
        elderSisters: body.family.elderSister,
        youngerSisters: body.family.youngerSister,
        marriedSisters: body.family.marriedSister,
      },
      create: {
        userId: Number(userId),
        fatherName: body.family.fatherName,
        motherName: body.family.motherName,
        fatherNative: body.family.fatherNative,
        motherNative: body.family.motherNative,
        fatherProfession: body.family.fatherProfession,
        motherProfession: body.family.motherProfession,
        phone: body.family.phoneNumber,
        address: body.family.address,
        brothers: body.family.brothers,
        sisters: body.family.sisters,
        elderBrothers: body.family.elderBrother,
        youngerBrothers: body.family.youngerBrother,
        marriedBrothers: body.family.marriedBrother,
        elderSisters: body.family.elderSister,
        youngerSisters: body.family.youngerSister,
        marriedSisters: body.family.marriedSister,
      },
    });
  }

  // Update HoroscopeProfile if present
  if (body.horoscope) {
    await prisma.horoscopeProfile.upsert({
      where: { userId: Number(userId) },
      update: {
        zodiacSign: body.horoscope.zodiacSign,
        tamilYear: body.horoscope.tamilYear,
        tamilMonth: body.horoscope.tamilMonth,
        udayathiNatchat: body.horoscope.udayathiNatchat,
        day: body.horoscope.day,
        birthTime: body.horoscope.birthTime,
        starFoot: body.horoscope.starFoot,
        ascendant: body.horoscope.ascendant,
        birthplace: body.horoscope.birthplace,
        natalDirection: body.horoscope.natalDirection,
      },
      create: {
        userId: Number(userId),
        zodiacSign: body.horoscope.zodiacSign,
        tamilYear: body.horoscope.tamilYear,
        tamilMonth: body.horoscope.tamilMonth,
        udayathiNatchat: body.horoscope.udayathiNatchat,
        day: body.horoscope.day,
        birthTime: body.horoscope.birthTime,
        starFoot: body.horoscope.starFoot,
        ascendant: body.horoscope.ascendant,
        birthplace: body.horoscope.birthplace,
        natalDirection: body.horoscope.natalDirection,
      },
    });
  }

  // Return updated profile (reuse GET logic)
  return GET(req);
}

