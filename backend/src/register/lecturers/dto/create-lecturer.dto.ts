import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator'

export class CreateLecturerDto {
  
  @IsNotEmpty()
  titleId?: number

  @IsOptional()
  academicTitleId?: number

  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsEmail()
  email: string

  @MinLength(8)
  password: string

  @IsNotEmpty()
  divisionId?: number
}