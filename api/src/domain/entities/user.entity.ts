import Role from 'src/core/enums/Role';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ nullable: false, length: 96 })
  email: string;

  @Column({ nullable: true, length: 80 })
  password: string;

  @Column({ nullable: true, length: 32 })
  firstName: string;

  @Column({ nullable: true, length: 32 })
  lastName: string;

  @Column('text', { nullable: true })
  image: string;

  @Column({ nullable: false, default: Role.User })
  role: Role;

  @Column({ nullable: false, default: false })
  status: boolean;
}
