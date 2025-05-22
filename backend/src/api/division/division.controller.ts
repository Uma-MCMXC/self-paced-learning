import { Controller, Get } from '@nestjs/common';
import { DivisionService } from './division.service';

@Controller('division')
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @Get()
  findAll() {
    return this.divisionService.findAll();
  }
}
