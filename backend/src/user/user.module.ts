import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module'; // ถ้าไม่ใช้ @Global()

@Module({
  imports: [PrismaModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
