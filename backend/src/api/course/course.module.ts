import { Module } from '@nestjs/common';
import { CourseController as PublicCourseController } from 'src/lecturer/course/course.controller';
import { SharedCourseModule } from 'src/shared/course/course.module';

@Module({
  imports: [SharedCourseModule],
  controllers: [PublicCourseController],
})
export class PublicCourseModule {}
