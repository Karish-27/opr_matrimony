import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  const profiles = await prisma.userProfile.findMany({
    include: {
      parentInfo: true,
      horoscopeProfile: true,
      user: true,
    },
  });

  const mappedProfiles = profiles.map((profile) => ({
    name: `${profile.user.firstName} ${profile.user.lastName}`,
    regNo: `VKR${profile.id}`,
    email: profile.user.email,
    phone: profile.phone,
    dob: profile.dob.toISOString().split("T")[0],
    age: profile.age,
    star: profile.horoscopeProfile?.starFoot || "",
    marriageStatus: profile.marriageStatus,
    height: profile.height,
    color: profile.color,
    caste: profile.caste,
    qualification: profile.education,
    familyProperty: profile.familyProperty,
    typeOfFood: profile.dietType,
    career: profile.career,
    salary: profile.salary,
    expectation: profile.expectation,
    image: Array.isArray(profile.profilePhotos) && profile.profilePhotos.length > 0
      ? profile.profilePhotos[0]
      : "/images/profilepicture.png",
    gallery: Array.isArray(profile.profilePhotos)
      ? profile.profilePhotos
      : [],
    family: profile.parentInfo
      ? {
          fatherName: profile.parentInfo.fatherName,
          motherName: profile.parentInfo.motherName,
          fatherNative: profile.parentInfo.fatherNative,
          motherNative: profile.parentInfo.motherNative,
          fatherProfession: profile.parentInfo.fatherProfession,
          motherProfession: profile.parentInfo.motherProfession,
          phoneNumber: profile.parentInfo.phone,
          address: profile.parentInfo.address,
          brothers: profile.parentInfo.brothers,
          sisters: profile.parentInfo.sisters,
          elderBrother: profile.parentInfo.elderBrothers,
          youngerBrother: profile.parentInfo.youngerBrothers,
          marriedBrother: profile.parentInfo.marriedBrothers,
          elderSister: profile.parentInfo.elderSisters,
          youngerSister: profile.parentInfo.youngerSisters,
          marriedSister: profile.parentInfo.marriedSisters,
        }
      : {},
    horoscope: profile.horoscopeProfile
      ? {
          zodiacSign: profile.horoscopeProfile.zodiacSign,
          tamilYear: profile.horoscopeProfile.tamilYear,
          tamilMonth: profile.horoscopeProfile.tamilMonth,
          udayathiNatchat: profile.horoscopeProfile.udayathiNatchat,
          day: profile.horoscopeProfile.day,
          birthTime: profile.horoscopeProfile.birthTime,
          starFoot: profile.horoscopeProfile.starFoot,
          ascendant: profile.horoscopeProfile.ascendant,
          birthplace: profile.horoscopeProfile.birthplace,
          natalDirection: profile.horoscopeProfile.natalDirection,
        }
      : {},
    chart: [],
  }));

  return NextResponse.json(mappedProfiles);
}
