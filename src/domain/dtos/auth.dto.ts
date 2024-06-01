import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    default: '',
  })
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({
    description: 'The password of the user',
    default: '',
  })
  password: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    default: '',
  })
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({
    description: 'The password of the user',
    default: '',
  })
  password: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({
    description: 'The confirm password of the user',
    default: '',
  })
  confirm: string;
}
