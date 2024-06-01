import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/domain/dtos/auth.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import Role from 'src/core/enums/Role';
import { CreateUserDto } from 'src/domain/dtos/user/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    let user = await this.userService.findAll({
      email: loginDto.email,
      page: 1,
      limit: 1,
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    user = user[0];

    const isPasswordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException('Wrong password', 400);
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return accessToken;
  }

  async register(registerDto: RegisterDto) {
    const createUser: CreateUserDto = {
      email: registerDto.email,
      password: registerDto.password,
      confirm: registerDto.confirm,
      role: Role.User,
      status: true,
      gender: true,
    };

    const user = await this.userService.create(createUser);
    
    const accessToken = this.jwtService.sign({
      sub: user.user_id,
      email: user.email,
      role: Role.User,
    });

    return accessToken;

    
  }
}
