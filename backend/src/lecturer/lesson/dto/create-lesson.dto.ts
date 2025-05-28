import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateLessonDto {
  @IsNotEmpty()
  @IsNumber()
  lessonTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsOptional()
  @IsNumber()
  courseInstructorId?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  documentUrl?: string;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @IsOptional()
  @IsNumber()
  parentId?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
