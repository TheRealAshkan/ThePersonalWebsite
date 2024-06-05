import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  @ApiProperty({
    description: 'The title of the portfolio',
    default: 'test',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'The description of the portfolio',
    default: 'test',
  })
  description: string;

  @IsString()
  @ApiProperty({
    description: 'The image of the portfolio',
    default: '',
  })
  image: string;

  @IsBoolean()
  @ApiProperty({
    description: 'The status of the portfolio',
    default: true,
  })
  status: boolean;
}
