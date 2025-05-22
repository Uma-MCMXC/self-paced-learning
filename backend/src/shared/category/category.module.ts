import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoryService } from 'src/lecturer/category/category.service';

@Module({
  imports: [PrismaModule],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class SharedCategoryModule {}
