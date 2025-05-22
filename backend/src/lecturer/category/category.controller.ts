import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request.interface';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto, UpdateStatusDto } from './dto/index';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt')) // ✅ ป้องกันด้วย JWT Auth
@Controller('category')
export class CategoryController {
  constructor(private service: CategoryService) {}

  @Get()
  findMine(@Req() req: AuthenticatedRequest) {
    return this.service.findAllByUser(req.user.userId);
  }

  @Post()
  create(@Body() dto: CreateCategoryDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.service.create({ ...dto, createdBy: userId });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.userId;
    return this.service.update(id, { ...dto, updatedBy: userId });
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.userId;
    return this.service.updateStatus(id, { ...dto, updatedBy: userId });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.service.delete(id, userId);
  }
}
