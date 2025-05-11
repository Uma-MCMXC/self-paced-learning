import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedUsers() {
  // ตรวจสอบ foreign key
  const adminRole = await prisma.userRole.findFirst({ where: { name: 'admin' } });
  const systemRole = await prisma.userRole.findFirst({ where: { name: 'system' } });
  const titleMs = await prisma.title.findFirst({ where: { name: 'นางสาว' } });

  if (!adminRole || !systemRole) {
    console.error('❌ Missing required roles or title');
    return;
  }

  // ✅ รีเซตลำดับก่อน insert
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "User_id_seq" RESTART WITH 1000`);

  await prisma.user.create({
    data: {
      userRoleId: systemRole.id,
      titleId: undefined,
      academicTitleId: undefined,
      firstName: 'system',
      lastName: 'user',
      email: 'system@example.com',
      password: 'system123',
      departmentId: undefined,
      isActive: true,
      createdAt: new Date(),
    },
  });

  await prisma.user.create({
    data: {
      userRoleId: adminRole.id,
      titleId: titleMs?.id,
      academicTitleId: undefined,
      firstName: 'อุมา',
      lastName: 'เพ็ชรคง',
      email: 'petkong28@gmail.com',
      password: 'admin1234',
      departmentId: undefined,
      isActive: true,
      createdAt: new Date(),
    },
  });

  console.log('✅ Seed Users completed.');
}
