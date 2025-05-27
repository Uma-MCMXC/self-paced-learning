import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // ต้องมี PrismaModule เพื่อให้ใช้งาน PrismaService ได้
  controllers: [CourseController],
  providers: [CourseService], // ต้องมี CourseService ตรงนี้
})
export class LecturerCourseModule {}
