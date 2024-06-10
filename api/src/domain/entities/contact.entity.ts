import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('contact')
export class Contact {
  @PrimaryGeneratedColumn()
  contact_id: number;

  @Column({ nullable: true, length: 120 })
  fullname: string;

  @Column({ nullable: true, length: 150 })
  title: string;

  @Column('text')
  message: string;
}
