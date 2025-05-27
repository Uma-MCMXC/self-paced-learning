import { Role } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getNowInBangkok } from 'src/utils/date.util';
import { CreateCourseDto, UpdateCourseStatusDto, UpdateCourseDto } from './dto/index';

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
          role: inst.role === 'owner' ? Role.OWNER : Role.CO_OWNER,
          isActive: true,
          updatedBy: userId,
          updatedAt: now,
        }));

        if (instructors.length > 0) {
          await tx.courseInstructor.createMany({
            data: instructors,
          });
        }

        return course;
      });
    } catch (error) {
      console.error('❌ CREATE COURSE ERROR:', error);
      throw error;
    }
  }

  /**
   * อัปเดตสถานะการเปิด/ปิดของคอร์ส
   */
  async updateStatus(id: number, dto: UpdateCourseStatusDto) {
    const now = getNowInBangkok();
    try {
      return await this.prisma.course.update({
        where: { id },
        data: {
          isActive: dto.isActive,
          updatedBy: dto.updatedBy,
          updatedAt: now,
        },
      });
    } catch (error) {
      console.error('❌ UPDATE STATUS ERROR:', error);
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
          courseInstructor: {
            where: { isActive: true, deletedAt: null },
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
          category: { select: { name: true } },
          createdByUser: { select: { firstName: true, lastName: true } },
          _count: { select: { lessons: true } },
        },
      });
    } catch (error) {
      console.error('❌ FETCH COURSES ERROR:', error);
      throw error;
    }
  }

  /**
   * ลบรายการ
   */
  async deleteCourse(id: number, userId: number) {
    const now = getNowInBangkok();

    try {
      return await this.prisma.$transaction(async (tx) => {
        // 🔸 1. Soft delete ใน course
        const course = await tx.course.update({
          where: { id },
          data: {
            deletedBy: userId,
            deletedAt: now,
          },
        });

        // 🔸 2. Soft delete ใน courseInstructor
        await tx.courseInstructor.updateMany({
          where: { courseId: id },
          data: {
            deletedBy: userId,
            deletedAt: now,
          },
        });

        return course;
      });
    } catch (error) {
      console.error('❌ DELETE COURSE ERROR:', error);
      throw error;
    }
  }

  // ดึงข้อมูลเพื่อแก้ไข
  async getCourseById(id: number, userId: number) {
    try {
      return await this.prisma.course.findFirst({
        where: {
          id,
          createdBy: userId,
          deletedAt: null,
        },
        include: {
          courseInstructor: {
            where: { isActive: true, deletedAt: null },
            select: {
              fullName: true,
              role: true,
              userId: true,
            },
          },
          category: { select: { name: true } },
        },
      });
    } catch (error) {
      console.error('❌ FETCH COURSE BY ID ERROR:', error);
      throw error;
    }
  }

  async updateCourse(courseId: number, dto: UpdateCourseDto, userId: number) {
    const now = getNowInBangkok();

    return this.prisma.$transaction(async (tx) => {
      // 🔍 ดึง instructors เดิม
      const oldInstructors = await tx.courseInstructor.findMany({
        where: { courseId, deletedAt: null },
      });

      // 🔑 key เดิมในฐานข้อมูล (string เท่านั้น)
      const oldKeys = oldInstructors
        .map((i) => (i.userId !== null ? String(i.userId) : i.fullName))
        .filter((k): k is string => k !== null && k !== undefined);

      // 🔑 key ใหม่จาก dto (string เท่านั้น)
      const newKeys: string[] = dto.instructors
        .map((i) => i.staffId ?? i.staffName)
        .filter((k): k is string => k !== null && k !== undefined);

      // 🔴 หา instructor ที่ถูกลบออก (soft delete)
      const toDelete = oldInstructors.filter((i) => {
        const key = i.userId !== null ? String(i.userId) : i.fullName;
        if (key === null) return false;
        return !newKeys.includes(key);
      });

      for (const instructor of toDelete) {
        await tx.courseInstructor.update({
          where: { id: instructor.id },
          data: {
            deletedBy: userId,
            deletedAt: now,
          },
        });
      }

      // 🟢 เพิ่ม instructor ใหม่ (หลีกเลี่ยงซ้ำ)
      const toAdd = dto.instructors.filter((i) => {
        const key = i.staffId ?? i.staffName;
        return key !== null && key !== undefined && !oldKeys.includes(key);
      });

      if (toAdd.length > 0) {
        await tx.courseInstructor.createMany({
          data: toAdd.map((i) => ({
            courseId,
            role: i.role === 'owner' ? Role.OWNER : Role.CO_OWNER,
            userId: i.staffId ? parseInt(i.staffId) : null,
            fullName: i.staffName,
            isActive: true,
            createdBy: userId,
            createdAt: now,
            updatedBy: userId,
            updatedAt: now,
          })),
        });
      }

      // ✏️ อัปเดตข้อมูลคอร์ส
      return await tx.course.update({
        where: { id: courseId },
        data: {
          name: dto.courseName,
          categoryId: dto.categoryId,
          description: dto.description,
          fee: dto.courseFee,
          imageUrl: dto.imageUrl ?? '',
          updatedBy: userId,
          updatedAt: now,
        },
      });
    });
  }

  async removeInstructor(
    courseId: number,
    body: { staffId?: string; staffName?: string },
    userId: number,
  ) {
    const now = getNowInBangkok();

    const target = await this.prisma.courseInstructor.findFirst({
      where: {
        courseId,
        deletedAt: null,
        ...(body.staffId ? { userId: parseInt(body.staffId) } : { fullName: body.staffName }),
      },
    });

    if (!target) throw new Error('Instructor not found');

    await this.prisma.courseInstructor.update({
      where: { id: target.id },
      data: {
        deletedAt: now,
        deletedBy: userId,
      },
    });

    return { message: 'Instructor removed' };
  }
}
