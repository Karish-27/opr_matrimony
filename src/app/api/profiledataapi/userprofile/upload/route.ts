import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic'; // for edge compatibility

export async function POST(req: NextRequest) {
  // Create upload directory if it doesn't exist
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  // Read the request body as a buffer
  const formData = await req.formData();
  const files = formData.getAll('profilePhotos') as File[];

  const urls: string[] = [];

  for (const file of files) {
    // @ts-ignore
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);
    urls.push(`/uploads/${filename}`);
  }

  return NextResponse.json({ urls });
}