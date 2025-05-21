import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';

import { TitleModule } from './title/title.module';
import { AcademicTitleModule } from './academic-title/academic-title.module';
import { OrganizationModule } from './organization/organization.module';
import { DivisionModule } from './division/division.module';

import { LecturersModule } from './register/lecturers/lecturers.module';
import { StudentsModule } from './register/students/students.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
