import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request.interface';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/index';
import { AuthGuard } from '@nestjs/passport';

@Controller('courses') // ✅ ชัดเจนว่าเกี่ยวกับ courses
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  /**
   * สร้างคอร์สใหม่ พร้อมบันทึก instructors
   * ใช้ JWT ในการระบุตัวผู้ใช้ที่สร้าง
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createCourse(@Req() req: AuthenticatedRequest, @Body() dto: CreateCourseDto) {
    const userId = req.user.userId;
    return this.courseService.createCourse(dto, userId);
  }

  /**
   * ดึงรายการคอร์สทั้งหมด พร้อม instructors
   */
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getCourses(@Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.courseService.getCourses(userId); // สามารถกรองตามผู้ใช้ได้
  }
}
