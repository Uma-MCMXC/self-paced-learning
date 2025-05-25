import { Role } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getNowInBangkok } from 'src/utils/date.util';
import { CreateCourseDto } from './dto/index';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async createCourse(dto: CreateCourseDto, userId: number) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const now = getNowInBangkok();

        // สร้าง course ใหม่
        const course = await tx.course.create({
          data: {
            categoryId: +dto.categoryId,
            name: dto.courseName,
            description: dto.description,
            imageUrl: dto.imageUrl ?? '',
            fee: +dto.courseFee,
            isActive: true,
            createdBy: userId,
            createdAt: now,
          },
        });

        // เตรียมข้อมูล instructors
        const instructors = dto.instructors.map((inst: any) => ({
          courseId: course.id,
          userId: inst.staffId === 'me' ? userId : inst.staffId ? +inst.staffId : null,
          fullName: inst.staffName,
          role: inst.role === 'owner' ? Role.OWNER : Role.CO_OWNER, // ✅ ใช้ enum แทน string
          isActive: true,
          updatedBy: userId,
          updatedAt: now,
        }));

        // ตรวจสอบกรณีไม่มี instructors (ป้องกันการส่ง empty array)
        if (instructors.length > 0) {
          await tx.courseInstructor.createMany({
            data: instructors,
          });
        }

        // ส่ง course กลับไปให้ controller
        return course;
      });
    } catch (error) {
      // บันทึก log error เผื่อ debug เพิ่มเติม
      console.error('❌ CREATE COURSE ERROR:', error);
      throw error;
    }
  }

  /**
   * ดึงรายการคอร์ส พร้อมจำนวน lessons และ instructors
   */
  async getCourses(userId: number) {
    try {
      return await this.prisma.course.findMany({
        where: { 
          createdBy: userId,
          deletedAt: null,
        },
        orderBy: { createdAt: 'desc' },
        include: {
          // สำหรับ lecturers
          courseInstructor: {
            where: { isActive: true },
            select: {
              fullName: true,
              role: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  academicTitle: { select: { name: true } },
                  title: { select: { name: true } },
                },
              },
            },
          },
          // ✅ สำหรับ category
          category: {
            select: {
              name: true,
            },
          },
          // ✅ สำหรับผู้สร้าง
          createdByUser: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          // ✅ นับจำนวน lessons
          _count: {
            select: {
              lessons: true,
            },
          },
        },
      });
    } catch (error) {
      console.error('❌ FETCH COURSES ERROR:', error);
      throw error;
    }
  }
}
