import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request.interface';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseStatusDto, UpdateCourseDto } from './dto/index';
import { AuthGuard } from '@nestjs/passport';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  /**
   * สร้างคอร์สใหม่ พร้อม instructors
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createCourse(@Req() req: AuthenticatedRequest, @Body() dto: CreateCourseDto) {
    const userId = req.user.userId;
    return this.courseService.createCourse(dto, userId);
  }

  /**
   * ดึงรายการคอร์สทั้งหมดของผู้ใช้
   */
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getCourses(@Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.courseService.getCourses(userId);
  }

  /**
   * อัปเดตสถานะเปิด/ปิดของคอร์ส
   */
  @Patch(':id/status')
  @UseGuards(AuthGuard('jwt'))
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCourseStatusDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.userId;
    return this.courseService.updateStatus(id, { ...dto, updatedBy: userId });
  }

  /**
   * ลบ
   */
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteCourse(@Param('id', ParseIntPipe) id: number, @Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.courseService.deleteCourse(id, userId);
  }

  /**
   * ดึงข้อมูลรายคอร์สตาม ID
   */
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getCourseById(@Param('id', ParseIntPipe) id: number, @Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.courseService.getCourseById(id, userId);
  }

  /**
   * แก้ไขข้อมูล
   */
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateCourse(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateCourseDto,
  ) {
    const userId = req.user.userId;
    return this.courseService.updateCourse(id, dto, userId);
  }

  // ลบ instructor
  @Patch(':id/remove-instructor')
  @UseGuards(AuthGuard('jwt'))
  async removeInstructor(
    @Param('id', ParseIntPipe) courseId: number,
    @Req() req: AuthenticatedRequest,
    @Body() body: { staffId?: string; staffName?: string },
  ) {
    const userId = req.user.userId;
    return this.courseService.removeInstructor(courseId, body, userId);
  }
}
