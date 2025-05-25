import { IsBoolean, IsNumber } from 'class-validator';

export class UpdateStatusDto {
  @IsBoolean()
  isActive: boolean;

  @IsNumber()
  updatedBy: number;
}
