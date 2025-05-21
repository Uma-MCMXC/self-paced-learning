import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentsDto } from './dto/create-student.dto';
import { USER_ROLES } from 'src/constants/roles';
import { getNowInBangkok } from 'src/utils/date.util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async register(dto: CreateStudentsDto) {
    // ตรวจสอบว่า email ซ้ำหรือไม่
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    // 🔐 เข้ารหัสรหัสผ่าน
    const hashed = await bcrypt.hash(dto.password, 10);

    // สร้าง Student
    const user = await this.prisma.user.create({
      data: {
        userRoleId: USER_ROLES.STUDENT,
        titleId: Number(dto.titleId),
        academicTitleId: dto.academicTitleId ? Number(dto.academicTitleId) : null,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        password: hashed,
        divisionId: dto.divisionId ? Number(dto.divisionId) : null,
        isActive: true,
        createdAt: getNowInBangkok(),
      },
    });

    return {
      message: 'Student registered successfully',
      userId: user.id,
    };
  }
}
