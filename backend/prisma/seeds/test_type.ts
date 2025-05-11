import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedTestTypes() {
  const types = ['foundation', 'pre-test', 'post-test', 'test'];

  await prisma.testType.createMany({
    data: types.map((name) => ({ name })),
    skipDuplicates: true,
  });

  console.log('✅ Seed TestType completed.');
}
