import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DivisionService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.division.findMany({
      where: { isActive: true },
      orderBy: { id: 'asc' },
      select: {
        id: true,
        name: true,
        organizationId: true,
      },
    });
  }
}
