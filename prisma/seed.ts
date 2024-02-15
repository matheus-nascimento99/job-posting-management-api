import { prisma } from '@/lib/prisma'

async function main() {
  await prisma.company.createMany({
    data: [
      { name: 'ABC Corp' },
      { name: 'XYZ LLC' },
      { name: 'ACME Enterprises' },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
