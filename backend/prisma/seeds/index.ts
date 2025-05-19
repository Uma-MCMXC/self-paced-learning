import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { seedAcademicTitles } from './academic_title';
import { seedLessonContentTypes } from './lesson_content_type';
import { seedLessonTypes } from './lesson_type';
import { seedQuestionLevels } from './question_level';
import { seedQuestionTypes } from './question_type';
import { seedResultLevels } from './result_level';
import { seedTestTypes } from './test_type';
import { seedTitles } from './title';
import { seedUserRoles } from './user_role';
import { seedUsers } from './user';
import { seedOrganizations } from './organizations';

async function main() {
  await seedAcademicTitles();
  await seedLessonContentTypes();
  await seedLessonTypes();
  await seedQuestionLevels();
  await seedQuestionTypes();
  await seedResultLevels();
  await seedTestTypes();
  await seedTitles();
  await seedUserRoles();
  await seedUsers();
  await seedOrganizations();
}

main()
  .then(() => {
    console.log('✅ All seeds completed.');
  })
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
