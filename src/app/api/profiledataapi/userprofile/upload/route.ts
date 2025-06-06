import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic'; // for edge compatibility

export async function POST(req: NextRequest) {
  try {
    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // Read the request body as a buffer
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    const profilePhotos = formData.getAll('profilePhotos') as File[];
    const type = formData.get('type') as string;
    const profileId = formData.get('profileId') as string;

    // Combine files from both possible form field names
    const allFiles = [...files, ...profilePhotos];

    if (allFiles.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const urls: string[] = [];

    for (const file of allFiles) {
      if (!file.type.startsWith('image/')) {
        continue; // Skip non-image files
      }

      // @ts-ignore
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const filename = `${Date.now()}-${file.name}`;
      const filepath = path.join(uploadDir, filename);
      fs.writeFileSync(filepath, buffer);
      urls.push(`/uploads/${filename}`);
    }

    if (urls.length === 0) {
      return NextResponse.json({ error: "No valid image files uploaded" }, { status: 400 });
    }

    // If profileId and type are provided, update the database
    if (profileId && type && ['profile', 'horoscope'].includes(type)) {
      try {
        // Find the user profile
        let userProfile = null;
        if (!isNaN(Number(profileId))) {
          userProfile = await prisma.userProfile.findUnique({
            where: { id: Number(profileId) },
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
                regNo: profileId,
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

        if (userProfile) {
          if (type === 'profile') {
            // Update profile photos
            const existingPhotos = userProfile.profilePhotos as string[] || [];
            const updatedPhotos = [...existingPhotos, ...urls];
            
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
              const updatedDocs = [...existingDocs, ...urls];
              
              await prisma.horoscopeProfile.update({
                where: { id: userProfile.profile.horoscopeProfile.id },
                data: {
                  horoscopeDocuments: updatedDocs,
                },
              });
            } else {
              // Create horoscope profile if it doesn't exist
              await prisma.horoscopeProfile.create({
                data: {
                  userId: userProfile.profile!.userId,
                  horoscopeDocuments: urls,
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
        }
      } catch (dbError) {
        console.error('Database update error:', dbError);
        // Still return success for file upload even if DB update fails
      }
    }

    return NextResponse.json({ 
      urls, 
      success: true,
      message: `${urls.length} image(s) uploaded successfully`
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}