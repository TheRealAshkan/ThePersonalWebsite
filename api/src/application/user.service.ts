import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pagination } from 'src/core/utils/pagination';
import { CreateUserDto } from 'src/domain/dtos/user/create-user.dto';
import { FilterUserDto } from 'src/domain/dtos/user/filter-user.dto';
import { UpdateUserDto } from 'src/domain/dtos/user/update-user.dto';
import { User } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const users = await this.findAll({
      email: createUserDto.email,
      page: 1,
      limit: 1,
    });
    if (users) {
      throw new HttpException(
        'This email has been registered by another person',
        400,
      );
    }

    if (createUserDto.password && createUserDto.confirm) {
      if (createUserDto.password != createUserDto.confirm) {
        throw new HttpException('Not equaled password with confirm', 400);
      }

      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    }

    const sendData = {
      ...createUserDto,
    };

    const user = await this.userRepository.create(sendData);
    
    await this.userRepository.save(user);
    // console.log('em',user.email)
    // user.user_id = await this.userRepository.getId(user);

    return user;
  }

  async findAll(filter: FilterUserDto) {
    const query = this.userRepository.createQueryBuilder().select('*');
    console.log(filter)
    if (filter.firstName) {
      query.where('firstName Like :firstName', {
        firstName: `%${filter.firstName}%`,
      });
    }

    if (filter.lastName) {
      query.where('lastName Like :lastName', {
        lastName: `%${filter.lastName}%`,
      });
    }

    if (filter.email) {
      query.where('email Like :email', { email: filter.email });
    }

    if (filter.status) {
      query.where('status Like :status', { status: filter.status });
    }

    pagination(query, { ...filter });

    const users = await query.execute();
    
    return users.length > 0 ? users : false;
  }

  async findOne(user_id: number) {
    const user = await this.userRepository.findOne({
      where: {
        user_id,
      },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  async update(user_id: number, updateUserDto: UpdateUserDto) {
    const findUser = await this.findOne(user_id);
    if (findUser) {
      if (updateUserDto.password && updateUserDto.password != '' && updateUserDto.password !== updateUserDto.confirm) {
        throw new HttpException('Not equaled password with confirm', 400);
      }

      if (updateUserDto.password)
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);

      delete updateUserDto.confirm;
      
      const user = await this.userRepository.update(+user_id, updateUserDto);
  
      if (user.affected === 0) {
        throw new HttpException('User not found', 404);
      }
  
      return user;
    }
  }

  async remove(user_id: number) {
    const user = await this.userRepository.delete(user_id);

    if (user.affected === 0) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }
}
