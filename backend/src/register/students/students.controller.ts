import { Body, Controller, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentsDto } from './dto/create-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('register')
  async register(@Body() dto: CreateStudentsDto) {
    return this.studentsService.register(dto);
  }
}
