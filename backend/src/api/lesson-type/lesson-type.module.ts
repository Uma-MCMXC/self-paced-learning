import { Module } from '@nestjs/common';
import { LessonTypeService } from './lesson-type.service';
import { LessonTypeController } from './lesson-type.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LessonTypeController],
  providers: [LessonTypeService, PrismaService],
})
export class LessonTypeModule {}
