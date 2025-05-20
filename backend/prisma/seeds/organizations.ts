import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function getNowInBangkok(): Date {
  const utcNow = new Date();
  const offsetMs = 7 * 60 * 60 * 1000;
  return new Date(utcNow.getTime() + offsetMs);
}

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
      createdAt: getNowInBangkok(),
    },
  });

  await prisma.division.create({
    data: {
      name: 'คณะวิทยาศาสตร์และนวัตกรรมดิจิทัล',
      organizationId: organization.id,
      isActive: true,
      createdAt: getNowInBangkok(),
    },
  });

  console.log('✅ Seed Organization and Division completed.');
}
