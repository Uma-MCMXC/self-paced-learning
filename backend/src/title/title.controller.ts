import { Controller, Get } from '@nestjs/common';
import { TitleService } from './title.service';

@Controller('titles')
export class TitleController {
  constructor(private readonly titleService: TitleService) {}

  @Get()
  findAll() {
    return this.titleService.findAll();
  }
}
