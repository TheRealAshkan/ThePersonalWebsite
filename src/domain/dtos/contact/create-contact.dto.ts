import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @ApiProperty({
    description: 'The title of the portfolio',
    default: 'ashkan',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'The message of the portfolio',
    default: 'message',
  })
  message: string;
}
