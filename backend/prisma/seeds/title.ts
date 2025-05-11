import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedTitles() {
  const titles = ['นาย', 'นาง', 'นางสาว'];

  await prisma.title.createMany({
    data: titles.map((name) => ({ name })),
    skipDuplicates: true,
  });

  console.log('✅ Seed Title completed.');
}
