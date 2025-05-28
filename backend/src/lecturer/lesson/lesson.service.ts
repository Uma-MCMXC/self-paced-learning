import { Role } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getNowInBangkok } from 'src/utils/date.util';
import { CreateLessonDto } from './dto/index';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async createLesson(dto: CreateLessonDto, userId: number) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const now = getNowInBangkok();

        const lesson = await tx.lesson.create({
          data: {
            lessonTypeId: +dto.lessonTypeId,
            courseId: +dto.courseId,
            name: dto.name,
            description: dto.description || '',
            documentUrl: dto.documentUrl || '',
            sortOrder: dto.sortOrder || 0,
            parentId: dto.parentId || null,
            isActive: dto.isActive ?? true,
            createdBy: userId,
            createdAt: now,
          },
        });

        return lesson;
      });
    } catch (error) {
      console.error('❌ CREATE LESSON ERROR:', error);
      throw error;
    }
  }
}
