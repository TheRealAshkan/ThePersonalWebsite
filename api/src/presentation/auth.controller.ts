import { Controller, Post, Body, UseGuards, Req, Get, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from 'src/application/auth.service';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { LoginDto, RegisterDto } from 'src/domain/dtos/auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'Success' })
  async login(@Body() authDto: LoginDto) {
    const token = await this.authService.login(authDto);
    return token;
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

  @Get('logged')
  @UseGuards(JwtAuthGuard)
  isLogged(@Req() request: Request) {
    const jwt = request.headers.authorization.split('Bearer ')[1];
    return this.authService.isLogged(jwt);
  }
}
