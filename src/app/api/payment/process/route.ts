import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId, transactionId, amount, plan } = await req.json();
    
    // Validate required fields
    if (!userId || !transactionId || !amount || !plan) {
      return NextResponse.json({ 
        error: "userId, transactionId, amount, and plan are required." 
      }, { status: 400 });
    }

    // Validate amount is positive
    if (amount <= 0) {
      return NextResponse.json({ 
        error: "Amount must be greater than 0." 
      }, { status: 400 });
    }

    // Check if transaction ID already exists to prevent duplicate processing
    const existingPayment = await prisma.payment.findFirst({
      where: { 
        customerName: transactionId // Using customerName field to store transaction ID
      }
    });

    if (existingPayment) {
      return NextResponse.json({ 
        error: "Transaction ID already processed." 
      }, { status: 409 });
    }

    // Determine credits based on plan/amount
    let creditsToAdd = 0;
    switch (plan) {
      case 'basic':
        creditsToAdd = 10; // Basic plan gives 10 credits
        break;
      case 'premium':
        creditsToAdd = 25; // Premium plan gives 25 credits
        break;
      case 'gold':
        creditsToAdd = 50; // Gold plan gives 50 credits
        break;
      default:
        // For custom amounts, give 1 credit per 10 rupees
        creditsToAdd = Math.floor(amount / 10);
        break;
    }

    // Start transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      // Record the payment
      const payment = await tx.payment.create({
        data: {
          customerName: transactionId, // Store transaction ID here
          transactionAmount: Number(amount),
          transactionDate: new Date()
        }
      });

      // Get current user credits
      const currentUser = await tx.user.findUnique({
        where: { id: Number(userId) },
        select: { id: true, firstName: true, lastName: true, credits: true }
      });

      if (!currentUser) {
        throw new Error('User not found');
      }

      // Add credits to user
      const updatedUser = await tx.user.update({
        where: { id: Number(userId) },
        data: { 
          credits: currentUser.credits + creditsToAdd 
        },
        select: { 
          id: true, 
          firstName: true, 
          lastName: true, 
          credits: true 
        }
      });

      return { payment, updatedUser, creditsAdded: creditsToAdd };
    });

    return NextResponse.json({
      success: true,
      message: `Payment processed successfully. ${result.creditsAdded} credits added to your account.`,
      payment: {
        id: result.payment.id,
        transactionId: transactionId,
        amount: result.payment.transactionAmount,
        date: result.payment.transactionDate
      },
      user: {
        id: result.updatedUser.id,
        name: `${result.updatedUser.firstName} ${result.updatedUser.lastName}`,
        totalCredits: result.updatedUser.credits,
        creditsAdded: result.creditsAdded
      }
    });

  } catch (error) {
    console.error('Payment processing error:', error);
    
    // Handle specific errors
    if (error instanceof Error) {
      if (error.message.includes('User not found')) {
        return NextResponse.json({ 
          error: "User not found." 
        }, { status: 404 });
      }
      
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json({ 
          error: "Transaction ID already exists." 
        }, { status: 409 });
      }
    }
    
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
