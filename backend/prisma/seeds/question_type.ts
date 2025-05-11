import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedQuestionTypes() {
  const types = ['choice', 'fill in blank', 'upload file'];

  await prisma.questionType.createMany({
    data: types.map((name) => ({ name })),
    skipDuplicates: true,
  });

  console.log('✅ Seed QuestionType completed.');
}
