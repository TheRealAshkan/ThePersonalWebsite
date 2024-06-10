import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsMobilePhone,
  IsOptional,
  IsString,
} from 'class-validator';

export class SetSettingDto {
  @IsString()
  @ApiProperty({
    description: 'The key of setting',
    default: '',
  })
  key: string;


  @IsString()
  @ApiProperty({
    description: 'The value of setting',
    default: '',
  })
  value: string;
}
