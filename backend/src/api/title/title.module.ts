import { Module } from '@nestjs/common';
import { TitleController } from './title.controller';
import { TitleService } from './title.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TitleController],
  providers: [TitleService, PrismaService],
})
export class TitleModule {}
