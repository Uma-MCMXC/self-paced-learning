import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';

import { TitleModule } from './title/title.module';
import { AcademicTitleModule } from './academic-title/academic-title.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    TitleModule,
    AcademicTitleModule,
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
