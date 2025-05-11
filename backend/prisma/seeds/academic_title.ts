import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedAcademicTitles() {
  const titles = ['ดร.', 'อ.', 'อ.ดร.', 'ผศ.', 'รศ.', 'ศ.', 'ผศ.ดร.', 'รศ.ดร.', 'ศ.ดร.'];

  await prisma.academicTitle.createMany({
    data: titles.map((name) => ({ name })),
    skipDuplicates: true,
  });

  console.log('✅ Seed AcademicTitle completed.');
}
