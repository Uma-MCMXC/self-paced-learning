import { Module } from '@nestjs/common';
import { AcademicTitleController } from './academic-title.controller';
import { AcademicTitleService } from './academic-title.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AcademicTitleController],
  providers: [AcademicTitleService, PrismaService],
})
export class AcademicTitleModule {}
