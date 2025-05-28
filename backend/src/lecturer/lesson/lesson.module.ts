import { Module } from '@nestjs/common';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // ต้องมี PrismaModule เพื่อให้ใช้งาน PrismaService ได้
  controllers: [LessonController],
  providers: [LessonService], // ต้องมี CourseService ตรงนี้
})
export class LecturerCourseModule {}
