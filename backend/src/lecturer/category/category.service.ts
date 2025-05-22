// category.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getNowInBangkok } from 'src/utils/date.util';
import { CreateCategoryDto, UpdateCategoryDto, UpdateStatusDto } from './dto/index';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  findAllByUser(userId: number) {
    return this.prisma.category.findMany({
      where: {
        deletedAt: null,
        createdBy: userId,
      },
      orderBy: { id: 'asc' },
    });
  }

  create(dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        name: dto.name,
        createdBy: dto.createdBy,
        createdAt: getNowInBangkok(),
      },
    });
  }

  update(id: number, dto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: {
        name: dto.name,
        updatedBy: dto.updatedBy,
        updatedAt: getNowInBangkok(),
      },
    });
  }

  updateStatus(id: number, dto: UpdateStatusDto) {
    return this.prisma.category.update({
      where: { id },
      data: {
        isActive: dto.isActive,
        updatedBy: dto.updatedBy,
        updatedAt: getNowInBangkok(),
      },
    });
  }

  delete(id: number, deletedBy: number) {
    return this.prisma.category.update({
      where: { id },
      data: {
        deletedAt: getNowInBangkok(),
        deletedBy,
      },
    });
  }
}
