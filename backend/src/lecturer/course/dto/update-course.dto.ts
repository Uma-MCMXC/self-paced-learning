// src/course/dto/update-course.dto.ts
import { IsString, IsNumber, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateInstructorDto {
  @IsString()
  role: 'owner' | 'co-owner';

  @IsOptional()
  @IsString()
  staffId?: string;

  @IsString()
  staffName: string;
}

export class UpdateCourseDto {
  @IsString()
  courseName: string;

  @IsNumber()
  categoryId: number;

  @IsString()
  description: string;

  @IsNumber()
  courseFee: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateInstructorDto)
  instructors: UpdateInstructorDto[];
}
