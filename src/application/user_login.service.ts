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
    const userLogin = await this.userLoginRepository.findBy({
        token: token,
    })
    return userLogin;
  }

  async addUserLogin(user_id: number, token: string) {
    const userLogin: UserLogin = await this.userLoginRepository.save({
        token: token,
        user: {
            user_id: user_id
        }
    })

    return userLogin;
  }

  async logout(token: string) {
    const userLogin = await this.userLoginRepository.delete({
        token: token,
    })
    return userLogin;
  }

}
