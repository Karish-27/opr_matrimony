import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    const type = formData.get('type') as string;

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    if (!type || !['profile', 'horoscope'].includes(type)) {
      return NextResponse.json({ error: "Invalid type specified" }, { status: 400 });
    }

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    const imageUrls: string[] = [];

    // Process each file
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        continue; // Skip non-image files
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.name}`;
      const filepath = path.join(uploadDir, filename);

      // Write file to disk
      await writeFile(filepath, buffer);
      
      // Add URL to array
      imageUrls.push(`/uploads/${filename}`);
    }

    if (imageUrls.length === 0) {
      return NextResponse.json({ error: "No valid image files uploaded" }, { status: 400 });
    }

    // Find the user profile
    let userProfile = null;
    if (!isNaN(Number(id))) {
      userProfile = await prisma.userProfile.findUnique({
        where: { id: Number(id) },
        include: {
          profile: {
            include: {
              horoscopeProfile: true,
            },
          },
        },
      });
    } else {
      userProfile = await prisma.userProfile.findFirst({
        where: {
          profile: {
            regNo: id,
          },
        },
        include: {
          profile: {
            include: {
              horoscopeProfile: true,
            },
          },
        },
      });
    }

    if (!userProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Update database based on type
    if (type === 'profile') {
      // Update profile photos
      const existingPhotos = userProfile.profilePhotos as string[] || [];
      const updatedPhotos = [...existingPhotos, ...imageUrls];
      
      await prisma.userProfile.update({
        where: { id: userProfile.id },
        data: {
          profilePhotos: updatedPhotos,
        },
      });
    } else if (type === 'horoscope') {
      // Update horoscope documents
      if (userProfile.profile?.horoscopeProfile) {
        const existingDocs = userProfile.profile.horoscopeProfile.horoscopeDocuments as string[] || [];
        const updatedDocs = [...existingDocs, ...imageUrls];
        
        await prisma.horoscopeProfile.update({
          where: { id: userProfile.profile.horoscopeProfile.id },
          data: {
            horoscopeDocuments: updatedDocs,
          },
        });      } else {
        // Create horoscope profile if it doesn't exist
        await prisma.horoscopeProfile.create({
          data: {
            userId: userProfile.profile!.userId,
            horoscopeDocuments: imageUrls,
            // Add required fields with default values
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
          },
        });
      }
    }

    return NextResponse.json({ 
      success: true, 
      imageUrls,
      message: `${imageUrls.length} image(s) uploaded successfully`
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 }
    );
  }
}
