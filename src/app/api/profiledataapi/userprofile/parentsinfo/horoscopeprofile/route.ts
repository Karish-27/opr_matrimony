import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@/generated/prisma';
import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();

async function parseForm(req: NextRequest) {
  const form = formidable({ multiples: true, uploadDir: './public/uploads', keepExtensions: true });

  // Convert the web stream to a Node.js readable stream
  const nodeReq = Object.assign(
    Object.create(Object.getPrototypeOf({})),
    req
  );
  nodeReq.headers = Object.fromEntries(req.headers.entries());
  nodeReq.method = req.method;
  nodeReq.url = req.url;
  nodeReq.socket = {};

  // @ts-ignore
  nodeReq._read = () => {};
  // @ts-ignore
  nodeReq.push = () => {};

  // Use the web stream as the body
  // @ts-ignore
  nodeReq.body = req.body;

  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    form.parse(nodeReq, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Extract fields
    const userId = Number(formData.get('userId'));
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

    // Handle files
    const files = formData.getAll('horoscopeDocuments');
    let documentUrls: string[] = [];

    for (const file of files) {
      if (typeof file === 'object' && 'arrayBuffer' in file && 'name' in file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${file.name}`;
        const uploadPath = path.join(process.cwd(), 'public', 'uploads', filename);
        await fs.writeFile(uploadPath, buffer);
        documentUrls.push(`/uploads/${filename}`);
      }
    }

    // Save to DB
    const horoscopeProfile = await prisma.horoscopeProfile.create({
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
        horoscopeDocuments: documentUrls.length > 0 ? documentUrls : Prisma.JsonNull,
      },
    });

    return NextResponse.json(horoscopeProfile);
  } catch (error) {
    console.error('horoscopeProfile create error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}