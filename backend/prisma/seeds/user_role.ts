import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedUserRoles() {
  const roles = ['system', 'admin', 'lecturer', 'student'];

  await prisma.userRole.createMany({
    data: roles.map((name) => ({ name })),
    skipDuplicates: true,
  });

  console.log('✅ Seed UserRole completed.');
}
