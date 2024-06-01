import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import Role from 'src/core/enums/Role';

export class CreateUserDto {
  @IsStrongPassword()
  @ApiProperty({
    description: 'The password of the user',
    default: 'A!@#123bcdefg',
  })
  @IsOptional()
  password: string;

  @IsStrongPassword()
  @ApiProperty({
    description: 'The confirm password of the user',
    default: 'A!@#123bcdefg',
  })
  @IsOptional()
  confirm: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The firstname of the user',
    default: 'ashkan',
  })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The lastname of the user',
    default: 'mahdizadeh',
  })
  lastName?: string;

  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    default: '',
  })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The image of the user',
    default: '',
  })
  image?: string;

  @IsBoolean()
  @ApiProperty({
    description: 'The gender of the user',
    default: true,
  })
  gender: boolean;

  @IsBoolean()
  @ApiProperty({
    description: 'The status of the user',
    default: true,
  })
  status: boolean;

  @IsNumber()
  @ApiProperty({
    description: 'The role of the user',
    default: Role.Admin,
  })
  role: Role;
}
