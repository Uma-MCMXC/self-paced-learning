import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.organization.findMany({
      where: { isActive: true },
      orderBy: { id: 'asc' },
    });
  }
}
