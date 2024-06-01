import { PaginationDto } from 'src/core/utils/pagination';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class FilterPortfolioDto extends PaginationDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
