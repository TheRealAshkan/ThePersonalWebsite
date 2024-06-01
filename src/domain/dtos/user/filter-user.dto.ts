import { PaginationDto } from 'src/core/utils/pagination';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class FilterUserDto extends PaginationDto {
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
}
