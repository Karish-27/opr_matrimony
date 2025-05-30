import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get all liked profiles (from Profile table)
    const likedProfiles = await prisma.profile.findMany({
      where: { liked: true },
      include: {
        user: true, // include user info if needed
      },
    });

    // Get all userProfiles with parentInfo and horoscopeProfile
    const userProfiles = await prisma.userProfile.findMany({
      include: {
        parentInfo: true,
        horoscopeProfile: true,
        user: true,
      },
    });

    // Match liked profiles with userProfiles by userId
    const enrichedProfiles = likedProfiles.map((liked) => {
      const userProfile = userProfiles.find((up) => up.userId === liked.userId);
      if (!userProfile) {
        return {
          name: (liked.user?.firstName || "") + ' ' + (liked.user?.lastName || ""),
          regNo: liked.regNo || `VKR${liked.id}`,
          email: liked.user?.email || null,
          age: liked.age || null,
          // Only basic fields from Profile model
          id: liked.id,
          liked: true,
        };
      }
      return {
        name: `${userProfile.user.firstName} ${userProfile.user.lastName}`,
        regNo: `VKR${userProfile.id}`,
        email: userProfile.user.email,
        phone: userProfile.phone,
        dob: userProfile.dob ? userProfile.dob.toISOString().split("T")[0] : null,
        age: userProfile.age,
        star: userProfile.horoscopeProfile?.starFoot || "",
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
        family: userProfile.parentInfo
          ? {
              fatherName: userProfile.parentInfo.fatherName,
              motherName: userProfile.parentInfo.motherName,
              fatherNative: userProfile.parentInfo.fatherNative,
              motherNative: userProfile.parentInfo.motherNative,
              fatherProfession: userProfile.parentInfo.fatherProfession,
              motherProfession: userProfile.parentInfo.motherProfession,
              phoneNumber: userProfile.parentInfo.phone,
              address: userProfile.parentInfo.address,
              brothers: userProfile.parentInfo.brothers,
              sisters: userProfile.parentInfo.sisters,
              elderBrother: userProfile.parentInfo.elderBrothers,
              youngerBrother: userProfile.parentInfo.youngerBrothers,
              marriedBrother: userProfile.parentInfo.marriedBrothers,
              elderSister: userProfile.parentInfo.elderSisters,
              youngerSister: userProfile.parentInfo.youngerSisters,
              marriedSister: userProfile.parentInfo.marriedSisters,
            }
          : {},
        horoscope: userProfile.horoscopeProfile
          ? {
              zodiacSign: userProfile.horoscopeProfile.zodiacSign,
              tamilYear: userProfile.horoscopeProfile.tamilYear,
              tamilMonth: userProfile.horoscopeProfile.tamilMonth,
              udayathiNatchat: userProfile.horoscopeProfile.udayathiNatchat,
              day: userProfile.horoscopeProfile.day,
              birthTime: userProfile.horoscopeProfile.birthTime,
              starFoot: userProfile.horoscopeProfile.starFoot,
              ascendant: userProfile.horoscopeProfile.ascendant,
              birthplace: userProfile.horoscopeProfile.birthplace,
              natalDirection: userProfile.horoscopeProfile.natalDirection,
            }
          : {},
        chart: [],
        liked: true,
        id: userProfile.id,
      };
    });

    return NextResponse.json({ profiles: enrichedProfiles });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch liked profiles" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
