import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CourseService } from 'src/lecturer/course/course.service';

@Module({
  imports: [PrismaModule],
  providers: [CourseService],
  exports: [CourseService],
})
export class SharedCourseModule {}
