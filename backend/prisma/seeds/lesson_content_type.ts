import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedLessonContentTypes() {
  const types = ['VIDEO', 'PDF'];

  await prisma.lessonContentType.createMany({
    data: types.map((name) => ({ name })),
    skipDuplicates: true,
  });

  console.log('✅ Seed LessonContentType completed.');
}
