import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedQuestionLevels() {
  const levels = ['easy', 'medium', 'hard'];

  await prisma.questionLevel.createMany({
    data: levels.map((name) => ({ name })),
    skipDuplicates: true,
  });

  console.log('✅ Seed QuestionLevel completed.');
}
