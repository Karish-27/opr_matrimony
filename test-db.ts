const { PrismaClient } = require('./src/generated/prisma'); // <-- custom path
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log(users);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());