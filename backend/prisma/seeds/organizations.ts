import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedOrganizations() {
  const creatorId = 1000;

  const systemUser = await prisma.user.findUnique({ where: { id: creatorId } });
  if (!systemUser) {
    console.error('❌ User ID 1000 (system) not found. Seed aborted.');
    return;
  }

  const existingOrg = await prisma.organization.findFirst({
    where: { name: 'มหาวิทยาลัยทักษิณ' },
  });

  if (existingOrg) {
    console.log('ℹ️ Organization already exists. Skipping...');
    return;
  }

  const organization = await prisma.organization.create({
    data: {
      name: 'มหาวิทยาลัยทักษิณ',
      isActive: true,
      createdBy: creatorId,
      createdAt: new Date(),
    },
  });

  await prisma.division.create({
    data: {
      name: 'คณะวิทยาศาสตร์และนวัตกรรมดิจิทัล',
      organizationId: organization.id,
      isActive: true,
      createdAt: new Date(),
    },
  });

  console.log('✅ Seed Organization and Division completed.');
}
