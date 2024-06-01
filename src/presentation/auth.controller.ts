import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/application/auth.service';
import { LoginDto, RegisterDto } from 'src/domain/dtos/auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'Success' })
  login(@Body() authDto: LoginDto) {
    return this.authService.login(authDto);
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'Success' })
  register(@Body() authDto: RegisterDto) {
    return this.authService.register(authDto);
  }

}
