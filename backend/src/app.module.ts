import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';

import { TitleModule } from './api/title/title.module';
import { AcademicTitleModule } from './api/academic-title/academic-title.module';
import { OrganizationModule } from './api/organization/organization.module';
import { DivisionModule } from './api/division/division.module';

import { LecturersModule } from './register/lecturers/lecturers.module';
import { StudentsModule } from './register/students/students.module';
import { LecturerCategoryModule as CategoryModule } from './lecturer/category/category.module';
import { LecturerCourseModule as CourseModule } from './lecturer/course/course.module';
import { UploadModule } from './shared/upload/upload.module';
import { LessonTypeModule } from './api/lesson-type/lesson-type.module';
import { LessonContentTypeModule } from './api/lesson-content-type/lesson-content-type.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    TitleModule,
    AcademicTitleModule,
    OrganizationModule,
    DivisionModule,
    LecturersModule,
    StudentsModule,
    CategoryModule,
    CourseModule,
    UploadModule,
    LessonTypeModule,
    LessonContentTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
