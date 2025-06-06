import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Get query parameters for pagination
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await prisma.userProfile.count();

    // Get all user profiles and join Profile, User, ParentInfo, HoroscopeProfile with pagination
    const userProfiles = await prisma.userProfile.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        profile: {
          include: {
            user: true,
            parentInfo: true,
            horoscopeProfile: true,
          },
        },
      },
    });    // Map to required fields including detailed data for PDF generation
    const users = userProfiles.map((up) => ({
      regNo: up.profile?.regNo || `VKR${up.id}`,
      name: `${up.profile?.user?.firstName || ""} ${up.profile?.user?.lastName || ""}`.trim(),
      email: up.profile?.user?.email || "",
      status: up.profile?.user?.isActive ? "Active" : "Inactive", // Add status based on isActive
      isActive: up.profile?.user?.isActive ?? true, // Include raw boolean value for toggle
      userId: up.profile?.user?.id, // Add userId for status toggle
      credits: up.profile?.user?.credits || 0, // Add credits
      createdAt: up.createdAt, // Add created date
      avatar:
        Array.isArray(up.profilePhotos) && up.profilePhotos.length > 0
          ? up.profilePhotos[0]
          : "/images/profilepicture.png",
      image:
        Array.isArray(up.profilePhotos) && up.profilePhotos.length > 0
          ? up.profilePhotos[0]
          : "/images/profilepicture.png",
      mobile: up.phone || "",
      phone: up.phone || "",
      gender: up.type || "",
      father: up.profile?.parentInfo?.fatherName || "",
      dob: up.dob ? (typeof up.dob === 'string' ? up.dob : up.dob.toISOString().split("T")[0]) : "",
      age: up.age,
      star: up.profile?.horoscopeProfile?.starFoot || "",
      marriageStatus: up.marriageStatus,
      height: up.height,
      qualification: up.education,
      color: up.color,
      caste: up.caste,
      familyProperty: up.familyProperty,
      typeOfFood: up.dietType,
      career: up.career,
      salary: up.salary,
      expectation: up.expectation,
      gallery: Array.isArray(up.profilePhotos) ? up.profilePhotos : [],
      family: up.profile?.parentInfo ? {
        fatherName: up.profile.parentInfo.fatherName,
        motherName: up.profile.parentInfo.motherName,
        fatherNative: up.profile.parentInfo.fatherNative,
        motherNative: up.profile.parentInfo.motherNative,
        fatherProfession: up.profile.parentInfo.fatherProfession,
        motherProfession: up.profile.parentInfo.motherProfession,
        phoneNumber: up.profile.parentInfo.phone,
        address: up.profile.parentInfo.address,
        brothers: up.profile.parentInfo.brothers,
        sisters: up.profile.parentInfo.sisters,
        elderBrother: up.profile.parentInfo.elderBrothers,
        youngerBrother: up.profile.parentInfo.youngerBrothers,
        marriedBrother: up.profile.parentInfo.marriedBrothers,
        elderSister: up.profile.parentInfo.elderSisters,
        youngerSister: up.profile.parentInfo.youngerSisters,
        marriedSister: up.profile.parentInfo.marriedSisters,
      } : {},
      horoscope: up.profile?.horoscopeProfile ? {
        zodiacSign: up.profile.horoscopeProfile.zodiacSign,
        tamilYear: up.profile.horoscopeProfile.tamilYear,
        tamilMonth: up.profile.horoscopeProfile.tamilMonth,
        udayathiNatchat: up.profile.horoscopeProfile.udayathiNatchat,
        day: up.profile.horoscopeProfile.day,
        birthTime: up.profile.horoscopeProfile.birthTime,
        starFoot: up.profile.horoscopeProfile.starFoot,
        ascendant: up.profile.horoscopeProfile.ascendant,
        birthplace: up.profile.horoscopeProfile.birthplace,
        natalDirection: up.profile.horoscopeProfile.natalDirection,
      } : {},
      chart: [],
    }));

    return NextResponse.json({ 
      users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
        itemsPerPage: limit,
        hasNextPage: page * limit < totalCount,
        hasPreviousPage: page > 1,
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
