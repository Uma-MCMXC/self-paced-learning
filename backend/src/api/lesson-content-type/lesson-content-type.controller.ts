import { Controller, Get } from '@nestjs/common';
import { LessonContentTypeService } from './lesson-content-type.service';

@Controller('lesson-content-types')
export class LessonContentTypeController {
  constructor(private readonly service: LessonContentTypeService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
