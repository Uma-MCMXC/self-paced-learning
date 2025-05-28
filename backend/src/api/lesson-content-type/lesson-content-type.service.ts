import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonContentTypeService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.lessonContentType.findMany({
      orderBy: { id: 'asc' },
    });
  }
}
