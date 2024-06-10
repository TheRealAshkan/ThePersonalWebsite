import { Length } from 'class-validator';

export class FilterContactDto {
    @Length(1, 3)
    page: number;
  
    @Length(1, 3)
    limit: number;
}
