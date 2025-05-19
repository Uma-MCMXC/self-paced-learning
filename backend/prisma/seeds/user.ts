import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

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

  // สร้าง system user
  await prisma.user.create({
    data: {
      userRoleId: systemRole.id,
      titleId: null,
      academicTitleId: null,
      firstName: 'system',
      lastName: 'user',
      email: 'system@example.com',
      password: await bcrypt.hash('system123', 10),
      divisionId: null,
      isActive: true,
      createdAt: new Date(),
    },
  });

  // สร้าง admin user
  await prisma.user.create({
    data: {
      userRoleId: adminRole.id,
      titleId: titleMs?.id ?? null,
      academicTitleId: null,
      firstName: 'อุมา',
      lastName: 'เพ็ชรคง',
      email: 'petkong28@gmail.com',
      password: await bcrypt.hash('admin1234', 10),
      divisionId: null,
      isActive: true,
      createdAt: new Date(),
    },
  });

  console.log('✅ Seed Users with bcrypt completed.');
}
