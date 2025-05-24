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
import { CourseModule } from './lecturer/course/course.module';
import { UploadModule } from './shared/upload/upload.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
