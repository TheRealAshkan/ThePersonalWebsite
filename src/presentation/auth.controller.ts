import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from 'src/application/auth.service';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
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

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() request: Request) {
    console.log(request.headers.authorization.split('Bearer ')[1]);
    const jwt = request.headers.authorization.split('Bearer ')[1];
    return this.authService.logout(jwt);
  }

}
