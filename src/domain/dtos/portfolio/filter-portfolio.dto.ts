import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class FilterPortfolioDto{
  @IsString()
  @IsOptional()
  title?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @Length(1, 3)
  page: number;

  @Length(1, 3)
  limit: number;
}
