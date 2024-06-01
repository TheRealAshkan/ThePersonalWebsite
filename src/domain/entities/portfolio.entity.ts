import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('portfolio')
export class Portfolio {
  @PrimaryGeneratedColumn()
  portfolio_id: number;

  @Column({ nullable: false, length: 255 })
  title: string;

  @Column('text')
  image: string;

  @Column('text')
  description: string;

  @Column({ nullable: false, default: false })
  status: boolean;
}
