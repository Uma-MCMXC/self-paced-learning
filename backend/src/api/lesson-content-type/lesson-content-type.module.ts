import { Module } from '@nestjs/common';
import { LessonContentTypeController } from './lesson-content-type.controller';
import { LessonContentTypeService } from './lesson-content-type.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LessonContentTypeController],
  providers: [LessonContentTypeService, PrismaService],
})
export class LessonContentTypeModule {}
