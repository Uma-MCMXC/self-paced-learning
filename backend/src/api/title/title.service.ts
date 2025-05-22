import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TitleService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.title.findMany({
      orderBy: { id: 'asc' },
    });
  }
}
