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
      error: "Admin users cannot access profile lists. This endpoint is for regular users only." 
    }, { status: 403 });
  }

  // Convert userId to number and validate
  const userIdNumber = Number(userId);
  if (isNaN(userIdNumber)) {
    return NextResponse.json({ 
      error: "Invalid user ID format. Please log in again." 
    }, { status: 400 });
  }

  // Get user's current credits
  const currentUser = await prisma.user.findUnique({
    where: { id: userIdNumber },
    select: { credits: true }
  });

  if (!currentUser) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }
  // Get current user's profile to determine their type
  const currentUserProfile = await prisma.userProfile.findUnique({
    where: { userId: userIdNumber },
    select: { type: true }
  });

  if (!currentUserProfile) {
    return NextResponse.json({ error: "User profile not found." }, { status: 404 });
  }

  // Get query parameters for filtering and pagination
  const { searchParams } = new URL(req.url);
  const gender = searchParams.get('gender');
  const star = searchParams.get('star');
  const marriageStatus = searchParams.get('marriageStatus');
  const ageFrom = searchParams.get('ageFrom');
  const ageTo = searchParams.get('ageTo');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  // Build where clause for userProfile filtering
  const userProfileWhere: any = {
    userId: { not: Number(userId) },
  };

  // Determine opposite gender type for automatic filtering
  const oppositeType = currentUserProfile.type === 'Groom' ? 'Bride' : 'Groom';
  
  // Add automatic opposite gender filter (overrides manual gender filter)
  userProfileWhere.type = oppositeType;

  // Add marriage status filter
  if (marriageStatus) {
    userProfileWhere.marriageStatus = marriageStatus;
  }

  // Add age range filter
  if (ageFrom || ageTo) {
    userProfileWhere.age = {};
    if (ageFrom) {
      userProfileWhere.age.gte = Number(ageFrom);
    }
    if (ageTo) {
      userProfileWhere.age.lte = Number(ageTo);
    }
  }
  // Get filtered userProfiles with pagination
  const skip = (page - 1) * limit;
  
  // Get total count for pagination
  const totalCount = await prisma.userProfile.count({
    where: userProfileWhere,
  });

  const userProfiles = await prisma.userProfile.findMany({
    where: userProfileWhere,
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });

  // Get all users (for name/email)
  const users = await prisma.user.findMany({
    where: { id: { in: userProfiles.map((p) => p.userId) } },
  });
  // Get all parentInfos
  const parentInfos = await prisma.parentInfo.findMany({
    where: { userId: { in: userProfiles.map((p) => p.userId) } },
  });
  // Get all horoscopeProfiles
  const horoscopeProfiles = await prisma.horoscopeProfile.findMany({
    where: { userId: { in: userProfiles.map((p) => p.userId) } },
  });  // Get all profiles with liked status
  const profiles = await prisma.profile.findMany({
    where: { userId: { in: userProfiles.map((p) => p.userId) } },
  });

  // Get profile views for current user to check which profiles they've already viewed
  const profileViews = await prisma.profileView.findMany({
    where: { userId: Number(userId) },
    select: { profileId: true }
  });
  const viewedProfileIds = new Set(profileViews.map(pv => pv.profileId));

  // Filter by star if specified (since star is in horoscope table)
  let filteredUserProfiles = userProfiles;
  if (star) {
    const matchingHoroscopes = horoscopeProfiles.filter(h => h.starFoot === star);
    const matchingUserIds = matchingHoroscopes.map(h => h.userId);
    filteredUserProfiles = userProfiles.filter(up => matchingUserIds.includes(up.userId));
  }  // Map userId to user, parentInfo, horoscopeProfile, and profile
  const userMap = Object.fromEntries(users.map(u => [u.id, u]));
  const parentInfoMap = Object.fromEntries(parentInfos.map(p => [p.userId, p]));
  const horoscopeMap = Object.fromEntries(horoscopeProfiles.map(h => [h.userId, h]));
  const profileMap = Object.fromEntries(profiles.map(p => [p.userId, p]));  const mappedProfiles = filteredUserProfiles.map((userProfile) => {
    const user = userMap[userProfile.userId];
    const parentInfo = parentInfoMap[userProfile.userId];
    const horoscopeProfile = horoscopeMap[userProfile.userId];
    const profile = profileMap[userProfile.userId];
    
    // Check if this profile has been viewed by current user
    const hasBeenViewed = viewedProfileIds.has(userProfile.userId);
    
    // Determine if profile should be locked based on credits and view status
    const shouldBeLocked = !hasBeenViewed && currentUser.credits <= 0;
      return {
      name: user ? `${user.firstName} ${user.lastName}` : "",
      regNo: `VKR${userProfile.id}`,
      email: user?.email || "",
      phone: userProfile.phone,
      dob: userProfile.dob.toISOString().split("T")[0],
      age: userProfile.age,
      star: horoscopeProfile?.starFoot || "",
      marriageStatus: userProfile.marriageStatus,
      height: userProfile.height,
      color: userProfile.color,
       gender: userProfile.type,
      caste: userProfile.caste,
      qualification: userProfile.education,
      familyProperty: userProfile.familyProperty,
      typeOfFood: userProfile.dietType,
      career: userProfile.career,
      salary: userProfile.salary,
      expectation: userProfile.expectation,
      isActive: user?.isActive !== false, // Include user active status
      liked: profile?.liked || false, // Include liked status from Profile table
      isLocked: shouldBeLocked, // Lock profile if no credits and not viewed
      hasBeenViewed: hasBeenViewed, // Track if user has viewed this profile
      userId: userProfile.userId, // Include the actual user ID for credit system
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
        : {},      horoscope: horoscopeProfile
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
            horoscopeDocuments: horoscopeProfile.horoscopeDocuments || [],
          }
        : {},      chart: [],
    };
  });
  return NextResponse.json({
    profiles: mappedProfiles,
    userCredits: currentUser.credits, // Include user's current credits in response
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalItems: totalCount,
      itemsPerPage: limit,
      hasNextPage: page * limit < totalCount,
      hasPreviousPage: page > 1,
    }
  });
}
