import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('user_login')
export class UserLogin {
  @PrimaryGeneratedColumn()
  user_login_id: number;

  @ManyToOne(() => User, (user) => user.user_id)
  user: User;

  @Column({length:1024})
  token: string;
}
