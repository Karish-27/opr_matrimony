import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@/generated/prisma';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Get userId from cookie (not from form data)
    const userIdFromCookie = req.cookies.get('userId')?.value;
    
    if (!userIdFromCookie) {
      return NextResponse.json({ error: "Not authenticated. Please log in." }, { status: 401 });
    }

    // Check if this is an admin user
    if (userIdFromCookie === "admin") {
      return NextResponse.json({ 
        error: "Admin users cannot create horoscope profiles. This endpoint is for regular users only." 
      }, { status: 403 });
    }

    // Convert userId to number and validate
    const userId = Number(userIdFromCookie);
    if (isNaN(userId)) {
      return NextResponse.json({ 
        error: "Invalid user ID format. Please log in again." 
      }, { status: 400 });
    }

    console.log('User ID from cookie:', userId);
    
    // Check if userId exists in Profile.userId
    const profileExists = await prisma.profile.findUnique({ where: { userId } });
    if (!profileExists) {
      return NextResponse.json({ error: 'UserProfile does not exist in the Profile table.' }, { status: 400 });
    }

    const formData = await req.formData();
    
    const zodiacSign = String(formData.get('zodiacSign'));
    const tamilYear = String(formData.get('tamilYear'));
    const tamilMonth = String(formData.get('tamilMonth'));
    const udayathiNatchat = String(formData.get('udayathiNatchat'));
    const day = String(formData.get('day'));
    const birthTime = String(formData.get('birthTime'));
    const starFoot = String(formData.get('starFoot'));
    const ascendant = String(formData.get('ascendant'));
    const birthplace = String(formData.get('birthplace'));
    const natalDirection = String(formData.get('natalDirection'));

    // Handle existing images
    const existingImages = formData.getAll('existingImages').filter(img => img) as string[];
    
    // Handle new image files (limit to 2 total)
    const newImageFiles = formData.getAll('horoscopeImages');
    let newImageUrls: string[] = [];

    // Validate total image count
    const totalImages = existingImages.length + newImageFiles.length;
    if (totalImages > 2) {
      return NextResponse.json({ error: 'Maximum 2 horoscope chart images allowed.' }, { status: 400 });
    }    for (const file of newImageFiles) {
      if (typeof file === 'object' && 'arrayBuffer' in file && 'name' in file) {
        // Validate file type more strictly
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
          return NextResponse.json({ 
            error: `Invalid file type: ${file.type}. Only JPEG, PNG, and WebP images are allowed.` 
          }, { status: 400 });
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          return NextResponse.json({ 
            error: `File ${file.name} is too large. Maximum size is 5MB.` 
          }, { status: 400 });
        }
        
        // Validate file name
        if (!file.name || file.name.length > 100) {
          return NextResponse.json({ 
            error: 'Invalid file name.' 
          }, { status: 400 });
        }
        
        try {
          const buffer = Buffer.from(await file.arrayBuffer());
          
          // Generate a unique filename with timestamp and sanitized original name
          const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '');
          const fileExtension = path.extname(sanitizedName);
          const baseName = path.basename(sanitizedName, fileExtension);
          const filename = `horoscope-${Date.now()}-${baseName}${fileExtension}`;
          
          // Ensure uploads directory exists
          const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
          try {
            await fs.access(uploadsDir);
          } catch {
            await fs.mkdir(uploadsDir, { recursive: true });
          }
          
          const uploadPath = path.join(uploadsDir, filename);
          await fs.writeFile(uploadPath, buffer);
          newImageUrls.push(`/uploads/${filename}`);
          
          console.log(`Successfully uploaded horoscope image: ${filename}`);
        } catch (uploadError) {
          console.error('Error uploading file:', uploadError);
          return NextResponse.json({ 
            error: `Failed to upload file ${file.name}. Please try again.` 
          }, { status: 500 });
        }
      }
    }

    // Combine existing and new image URLs
    const allImageUrls = [...existingImages, ...newImageUrls];

    // Check if horoscope profile already exists for this user
    const existingHoroscope = await prisma.horoscopeProfile.findUnique({
      where: { userId }
    });

    let horoscopeProfile;
    if (existingHoroscope) {
      // Update existing horoscope profile
      horoscopeProfile = await prisma.horoscopeProfile.update({
        where: { userId },
        data: {
          zodiacSign,
          tamilYear,
          tamilMonth,
          udayathiNatchat,
          day,
          birthTime,
          starFoot,
          ascendant,
          birthplace,
          natalDirection,
          horoscopeDocuments: allImageUrls.length > 0 ? allImageUrls : Prisma.JsonNull,
        },
      });
    } else {
      // Create new horoscope profile
      horoscopeProfile = await prisma.horoscopeProfile.create({
        data: {
          userId,
          zodiacSign,
          tamilYear,
          tamilMonth,
          udayathiNatchat,
          day,
          birthTime,
          starFoot,
          ascendant,
          birthplace,
          natalDirection,
          horoscopeDocuments: allImageUrls.length > 0 ? allImageUrls : Prisma.JsonNull,
        },
      });
    }

    return NextResponse.json(horoscopeProfile);
  } catch (error) {
    console.error('horoscopeProfile create/update error:', error);
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
      error: "Admin users do not have horoscope profiles. This endpoint is for regular users only." 
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
    const horoscopeProfile = await prisma.horoscopeProfile.findUnique({
      where: { userId: userIdNumber },
    });

    if (!horoscopeProfile) {
      return NextResponse.json({ error: "Horoscope profile not found" }, { status: 404 });
    }

    return NextResponse.json(horoscopeProfile);
  } catch (error) {
    console.error("Error fetching horoscope profile:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}