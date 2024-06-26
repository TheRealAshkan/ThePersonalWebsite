import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLogin } from 'src/domain/entities/user_login.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserLoginService {
  constructor(
    @InjectRepository(UserLogin)
    private readonly userLoginRepository: Repository<UserLogin>
  ) {}

  async checkUserIsLogged(token: string) {
    const userLogin = await this.userLoginRepository.find({
      where: {
        token
      },
      select: ['token' , 'user' , 'user_login_id'] ,
      relations: ["user"]
    })
    return userLogin;
  }

  async addUserLogin(user_id: number, token: string) {
    const user_login = await this.userLoginRepository.create({
      token: token,
      user: {
        user_id
      }
    });
    
    await this.userLoginRepository.save(user_login);
   
    return user_login;
  }

  async logout(token: string) {
    const userLogin = await this.userLoginRepository.delete({
        token: token,
    })
    return userLogin;
  }

}
