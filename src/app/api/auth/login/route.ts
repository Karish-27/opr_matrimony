import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Validation functions (same as registration)
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

function validatePassword(password: string): boolean {
  // Password must be at least 8 characters with at least one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Input validation - check if fields are provided
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Validate email format (same as registration)
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format. Please enter a valid email address." },
        { status: 422 }
      );
    }

    // Validate password format (same requirements as registration)
    if (!validatePassword(password)) {
      return NextResponse.json(
        { 
          error: "Password must be at least 8 characters with uppercase, lowercase, and number - same as registration requirements." 
        },
        { status: 422 }
      );
    }

    // Find user by email (case-insensitive search)
    const user = await prisma.user.findUnique({ 
      where: { 
        email: email.trim().toLowerCase() 
      },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true
      }
    });

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email address. Please register first." },
        { status: 404 }
      );
    }

    // Compare password with hashed password stored during registration
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { 
          error: "The password you entered does not match the password used during registration." 
        },
        { status: 400 }
      );
    }

    // Login successful - return user data (excluding password)
    return NextResponse.json({ 
      message: "Login successful",
      user: { 
        id: user.id, 
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      } 
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  } finally {
    // Close Prisma connection
    await prisma.$disconnect();
  }
}