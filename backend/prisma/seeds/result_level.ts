import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedResultLevels() {
  const levels = ['low', 'medium', 'hard'];

  await prisma.resultLevel.createMany({
    data: levels.map((name) => ({ name })),
    skipDuplicates: true,
  });

  console.log('✅ Seed ResultLevel completed.');
}
