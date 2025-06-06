import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET all payments
export async function GET(req: NextRequest) {
  try {
    // Get query parameters for pagination
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await prisma.payment.count();

    const payments = await prisma.payment.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ 
      success: true, 
      payments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
        itemsPerPage: limit,
        hasNextPage: page * limit < totalCount,
        hasPreviousPage: page > 1,
      }
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}

// POST - Create new payment
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, transactionAmount, transactionDate } = body;

    if (!customerName || !transactionAmount || !transactionDate) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const payment = await prisma.payment.create({
      data: {
        customerName,
        transactionAmount: parseFloat(transactionAmount),
        transactionDate: new Date(transactionDate),
      },
    });

    return NextResponse.json({ success: true, payment });
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create payment" },
      { status: 500 }
    );
  }
}

// DELETE - Delete payment
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Payment ID is required" },
        { status: 400 }
      );
    }

    await prisma.payment.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting payment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete payment" },
      { status: 500 }
    );
  }
}
