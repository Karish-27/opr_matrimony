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
    const totalCount = await prisma.profile.count({
      where: { liked: true },
    });

    // Get all liked profiles (from Profile table) with pagination
    const likedProfiles = await prisma.profile.findMany({
      where: { liked: true },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
      },
    });

    console.log("Found liked profiles:", likedProfiles.length);

    // Get all related data separately to avoid join issues
    const enrichedProfiles = await Promise.all(
      likedProfiles.map(async (profile) => {
        try {
          // Get UserProfile data
          const userProfile = await prisma.userProfile.findUnique({
            where: { userId: profile.userId },
          });

          // Get ParentInfo data
          const parentInfo = await prisma.parentInfo.findUnique({
            where: { userId: profile.userId },
          });

          // Get HoroscopeProfile data
          const horoscopeProfile = await prisma.horoscopeProfile.findUnique({
            where: { userId: profile.userId },
          });

          return {
            id: profile.id,
            name: `${profile.user.firstName} ${profile.user.lastName}`,
            regNo: profile.regNo || `VKR${profile.id}`,
            email: profile.user.email,
            phone: userProfile?.phone || "",
            dob: userProfile?.dob ? userProfile.dob.toISOString().split("T")[0] : null,
            age: userProfile?.age || profile.age,
            star: horoscopeProfile?.starFoot || "",
            marriageStatus: userProfile?.marriageStatus || "",
            height: userProfile?.height || "",
            color: userProfile?.color || "",
            caste: userProfile?.caste || "",
            qualification: userProfile?.education || "",
            familyProperty: userProfile?.familyProperty || "",
            typeOfFood: userProfile?.dietType || "",
            career: userProfile?.career || "",
            salary: userProfile?.salary || "",
            expectation: userProfile?.expectation || "",
            image: userProfile?.profilePhotos && Array.isArray(userProfile.profilePhotos) && userProfile.profilePhotos.length > 0
              ? userProfile.profilePhotos[0]
              : "/images/profilepicture.png",
            gallery: userProfile?.profilePhotos && Array.isArray(userProfile.profilePhotos)
              ? userProfile.profilePhotos
              : [],
            family: parentInfo
              ? {
                  fatherName: parentInfo.fatherName || "",
                  motherName: parentInfo.motherName || "",
                  fatherNative: parentInfo.fatherNative || "",
                  motherNative: parentInfo.motherNative || "",
                  fatherProfession: parentInfo.fatherProfession || "",
                  motherProfession: parentInfo.motherProfession || "",
                  phoneNumber: parentInfo.phone || "",
                  address: parentInfo.address || "",
                  brothers: parentInfo.brothers || 0,
                  sisters: parentInfo.sisters || 0,
                  elderBrother: parentInfo.elderBrothers || 0,
                  youngerBrother: parentInfo.youngerBrothers || 0,
                  marriedBrother: parentInfo.marriedBrothers || 0,
                  elderSister: parentInfo.elderSisters || 0,
                  youngerSister: parentInfo.youngerSisters || 0,
                  marriedSister: parentInfo.marriedSisters || 0,
                }
              : {
                  fatherName: "",
                  motherName: "",
                  fatherNative: "",
                  motherNative: "",
                  fatherProfession: "",
                  motherProfession: "",
                  phoneNumber: "",
                  address: "",
                  brothers: 0,
                  sisters: 0,
                  elderBrother: 0,
                  youngerBrother: 0,
                  marriedBrother: 0,
                  elderSister: 0,
                  youngerSister: 0,
                  marriedSister: 0,
                },            horoscope: horoscopeProfile
              ? {
                  zodiacSign: horoscopeProfile.zodiacSign || "",
                  tamilYear: horoscopeProfile.tamilYear || "",
                  tamilMonth: horoscopeProfile.tamilMonth || "",
                  udayathiNatchat: horoscopeProfile.udayathiNatchat || "",
                  day: horoscopeProfile.day || "",
                  birthTime: horoscopeProfile.birthTime || "",
                  starFoot: horoscopeProfile.starFoot || "",
                  ascendant: horoscopeProfile.ascendant || "",
                  birthplace: horoscopeProfile.birthplace || "",
                  natalDirection: horoscopeProfile.natalDirection || "",
                  horoscopeDocuments: horoscopeProfile.horoscopeDocuments || [],
                }
              : {
                  zodiacSign: "",
                  tamilYear: "",
                  tamilMonth: "",
                  udayathiNatchat: "",
                  day: "",
                  birthTime: "",
                  starFoot: "",
                  ascendant: "",
                  birthplace: "",
                  natalDirection: "",
                  horoscopeDocuments: [],
                },
            chart: [],
            liked: true,
          };
        } catch (profileError) {
          console.error(`Error processing profile ${profile.id}:`, profileError);
          // Return basic profile info if detailed info fails
          return {
            id: profile.id,
            name: `${profile.user.firstName} ${profile.user.lastName}`,
            regNo: profile.regNo || `VKR${profile.id}`,
            email: profile.user.email,
            phone: "",
            dob: null,
            age: profile.age,
            star: "",
            marriageStatus: "",
            height: "",
            color: "",
            caste: "",
            qualification: "",
            familyProperty: "",
            typeOfFood: "",
            career: "",
            salary: "",
            expectation: "",
            image: "/images/profilepicture.png",
            gallery: [],
            family: {
              fatherName: "",
              motherName: "",
              fatherNative: "",
              motherNative: "",
              fatherProfession: "",
              motherProfession: "",
              phoneNumber: "",
              address: "",
              brothers: 0,
              sisters: 0,
              elderBrother: 0,
              youngerBrother: 0,
              marriedBrother: 0,
              elderSister: 0,
              youngerSister: 0,
              marriedSister: 0,
            },            horoscope: {
              zodiacSign: "",
              tamilYear: "",
              tamilMonth: "",
              udayathiNatchat: "",
              day: "",
              birthTime: "",
              starFoot: "",
              ascendant: "",
              birthplace: "",
              natalDirection: "",
              horoscopeDocuments: [],
            },
            chart: [],
            liked: true,
          };
        }
      })
    );    console.log("Enriched profiles:", enrichedProfiles.length);
    return NextResponse.json({ 
      profiles: enrichedProfiles,
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
    console.error("Error fetching liked profiles:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch liked profiles", 
        details: typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : String(error) 
      }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
