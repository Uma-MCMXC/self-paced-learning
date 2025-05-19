import { Controller, Get } from '@nestjs/common';
import { AcademicTitleService } from './academic-title.service';

@Controller('academic-titles')
export class AcademicTitleController {
  constructor(private readonly academicTitleService: AcademicTitleService) {}

  @Get()
  findAll() {
    return this.academicTitleService.findAll();
  }
}
