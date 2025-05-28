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
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/index';
import { AuthGuard } from '@nestjs/passport';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  /**
   * สร้างคอร์สใหม่ พร้อม instructors
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createCourse(@Req() req: AuthenticatedRequest, @Body() dto: CreateLessonDto) {
    const userId = req.user.userId;
    return this.lessonService.createLesson(dto, userId);
  }
}
