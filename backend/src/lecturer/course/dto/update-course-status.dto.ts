import { IsBoolean, IsNumber } from 'class-validator';

export class UpdateCourseStatusDto {
  @IsBoolean()
  isActive: boolean;

  @IsNumber()
  updatedBy: number;
}
