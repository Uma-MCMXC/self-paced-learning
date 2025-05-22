import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AcademicTitleService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.academicTitle.findMany({
      orderBy: { id: 'asc' },
    });
  }
}
