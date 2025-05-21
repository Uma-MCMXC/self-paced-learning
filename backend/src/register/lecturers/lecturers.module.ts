import { Module } from '@nestjs/common';
import { LecturersController } from './lecturers.controller';
import { LecturersService } from './lecturers.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LecturersController],
  providers: [LecturersService],
})
export class LecturersModule {}
