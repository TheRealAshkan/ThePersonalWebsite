import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('setting')
export class Setting {
  @PrimaryGeneratedColumn()
  setting_id: number;

  @Column({ nullable: false, length: 200 })
  key: string;

  @Column('text')
  value: string;
}
