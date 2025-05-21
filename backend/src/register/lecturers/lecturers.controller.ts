import { Body, Controller, Post } from '@nestjs/common';
import { LecturersService } from './lecturers.service';
import { CreateLecturerDto } from './dto/create-lecturer.dto';

@Controller('lecturers')
export class LecturersController {
  constructor(private readonly lecturersService: LecturersService) {}

  @Post('register')
  async register(@Body() dto: CreateLecturerDto) {
    return this.lecturersService.register(dto);
  }
}
