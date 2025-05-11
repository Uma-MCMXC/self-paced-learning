import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // หรือ service ที่คุณใช้เชื่อม DB
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // ฟังก์ชันอื่น ๆ เช่น createUser(), findById(), updateUser(), deleteUser() ก็เพิ่มได้ที่นี่
}
