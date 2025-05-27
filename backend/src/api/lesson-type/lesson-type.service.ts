import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonTypeService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.lessonType.findMany({
      orderBy: { id: 'asc' },
    });
  }
}
