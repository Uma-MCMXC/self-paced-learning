import { Controller, Get } from '@nestjs/common';
import { LessonTypeService } from './lesson-type.service';

@Controller('lesson-types')
export class LessonTypeController {
  constructor(private readonly service: LessonTypeService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
