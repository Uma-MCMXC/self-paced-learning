import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedOrganizations() {
  const creatorId = 1000; // system user

  // ตรวจสอบว่า user id 1000 มีอยู่หรือยัง
  const systemUser = await prisma.user.findUnique({ where: { id: creatorId } });
  if (!systemUser) {
    console.error('❌ User ID 1000 (system) not found. Seed aborted.');
    return;
  }

  // 🔁 ตรวจสอบว่ามี organization นี้อยู่แล้วหรือยัง
  const existingOrg = await prisma.organization.findFirst({
    where: { name: 'มหาวิทยาลัยทักษิณ' },
  });

  if (existingOrg) {
    console.log('Organization already exists. Skipping...');
    return;
  }

  // สร้าง Organization
  const organization = await prisma.organization.create({
    data: {
      name: 'มหาวิทยาลัยทักษิณ',
      createdBy: creatorId,
      createdAt: new Date(),
      isActive: true,
    },
  });

  // สร้าง Department ที่เชื่อมโยงกับ Organization
  await prisma.division.create({
    data: {
      name: 'คณะวิทยาศาสตร์และนวัตกรรมดิจิทัล',
      organizationId: organization.id,
      createdAt: new Date(),
      isActive: true,
    },
  });

  console.log('Seed Organization and Division completed.');
}
