import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Validation functions (same as frontend and login API)
function validateName(name: string): boolean {
  // Name should be at least 2 characters and contain only letters and spaces
  return /^[a-zA-Z\s]{2,}$/.test(name.trim());
}

function validateEmail(email: string): boolean {
  // More robust email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

function validatePassword(password: string): boolean {
  // Password must be at least 8 characters with at least one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName } = await req.json();

    // Input validation - check if all required fields are provided
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate first name
    if (!validateName(firstName)) {
      return NextResponse.json(
        { error: "First name must be at least 2 characters and contain only letters" },
        { status: 422 }
      );
    }

    // Validate last name
    if (!validateName(lastName)) {
      return NextResponse.json(
        { error: "Last name must be at least 2 characters and contain only letters" },
        { status: 422 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 422 }
      );
    }

    // Validate password strength
    if (!validatePassword(password)) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters with uppercase, lowercase, and number" },
        { status: 422 }
      );
    }

    // Check if user already exists (case-insensitive)
    const existingUser = await prisma.user.findUnique({ 
      where: { 
        email: email.trim().toLowerCase() 
      } 
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" }, 
        { status: 409 } // 409 Conflict is more appropriate than 400
      );
    }

    // Hash password for security
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Step 1: Create the user without the profile
    const createdUser = await prisma.user.create({
      data: {
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      },
    });

    // Step 2: Generate regNo as VKR + userId
    const regNo = `VKR${createdUser.id}`;

    // Step 3: Create the profile with the generated regNo and link to user
    const createdProfile = await prisma.profile.create({
      data: {
        userId: createdUser.id,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        regNo,
      },
    });

    // Return success response (exclude password for security)
    return NextResponse.json({
      message: "Registration successful",
      userId: createdUser.id,
      user: {
        id: createdUser.id,
        email: createdUser.email,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        profile: {
          id: createdProfile.id,
          firstName: createdProfile.firstName,
          lastName: createdProfile.lastName,
          regNo: createdProfile.regNo,
          createdAt: createdProfile.createdAt,
        },
      },
    }, { status: 201 }); // 201 Created is more appropriate for resource creation

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific Prisma errors
    if (typeof error === "object" && error !== null && "code" in error && (error as any).code === 'P2002') {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  } finally {
    // Clean up Prisma connection
    await prisma.$disconnect();
  }
}