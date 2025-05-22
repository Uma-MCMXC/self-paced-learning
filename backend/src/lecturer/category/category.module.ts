import { Module } from '@nestjs/common';
import { CategoryController as LecturerCategoryController } from './category.controller';
import { SharedCategoryModule } from 'src/shared/category/category.module';

@Module({
  imports: [SharedCategoryModule],
  controllers: [LecturerCategoryController],
})
export class LecturerCategoryModule {}
