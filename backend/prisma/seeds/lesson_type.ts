import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedLessonTypes() {
  const types = ['main lesson', 'supplementary lesson'];

  await prisma.lessonType.createMany({
    data: types.map((name) => ({ name })),
    skipDuplicates: true,
  });

  console.log('✅ Seed LessonType completed.');
}
