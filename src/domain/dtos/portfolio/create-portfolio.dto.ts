import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  @ApiProperty({
    description: 'The firstname of the portfolio',
    default: 'ashkan',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'The lastname of the portfolio',
    default: 'mahdizadeh',
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
