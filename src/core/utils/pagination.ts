import { IsOptional, Length } from 'class-validator';

export class PaginationDto {
  @Length(1, 3)
  @IsOptional()
  page: number;

  @Length(1, 3)
  @IsOptional()
  limit: number;
}

export function pagination(query: any, filter: PaginationDto) {
  if (!filter.page) {
    filter.page = 1;
  }

  if (!filter.limit) {
    filter.limit = 10;
  }
  const skip: number = (Number(filter.page) - 1) * Number(filter.limit);
  query.skip(skip);
  query.take(filter.limit);
}
