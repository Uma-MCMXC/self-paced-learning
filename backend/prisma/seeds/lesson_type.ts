import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedLessonTypes() {
  const types = ['Main Lesson', 'Supplementary Lesson'];

  await prisma.lessonType.createMany({
    data: types.map((name) => ({ name })),
    skipDuplicates: true,
  });

  console.log('✅ Seed LessonType completed.');
}
