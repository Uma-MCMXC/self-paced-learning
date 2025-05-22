import { Module } from '@nestjs/common';
import { CategoryController as PublicCategoryController } from 'src/lecturer/category/category.controller';
import { SharedCategoryModule } from 'src/shared/category/category.module';

@Module({
  imports: [SharedCategoryModule],
  controllers: [PublicCategoryController],
})
export class PublicCategoryModule {}
