const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function seedPayments() {
  try {
    console.log('Adding sample payment data...');    // Sample payment records
    const samplePayments = [
      {
        customerName: 'John Smith',
        transactionAmount: 24999.00, // ₹24,999
        transactionDate: new Date('2024-05-15'),
      },
      {
        customerName: 'Sarah Johnson',
        transactionAmount: 41499.00, // ₹41,499
        transactionDate: new Date('2024-05-20'),
      }
    ];

    // Insert sample data
    for (const payment of samplePayments) {
      await prisma.payment.create({
        data: payment
      });
      console.log(`Added payment for ${payment.customerName}`);
    }

    console.log('Sample payment data added successfully!');
  } catch (error) {
    console.error('Error seeding payment data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedPayments();
