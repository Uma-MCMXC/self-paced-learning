import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<(User & { userRole: { name: string } }) | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        userRole: true, // ดึงข้อมูล role เพื่อใช้ใน JWT และ frontend
      },
    });
  }
}
