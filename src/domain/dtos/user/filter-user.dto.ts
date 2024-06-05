import { PaginationDto } from 'src/core/utils/pagination';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class FilterUserDto{
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  status?: 0 | 1;

  @Length(1, 3)
  page: number;

  @Length(1, 3)
  limit: number;
}
