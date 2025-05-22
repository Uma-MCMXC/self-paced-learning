import { Module } from '@nestjs/common';
import { DivisionController } from './division.controller';
import { DivisionService } from './division.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DivisionController],
  providers: [DivisionService, PrismaService],
})
export class DivisionModule {}
