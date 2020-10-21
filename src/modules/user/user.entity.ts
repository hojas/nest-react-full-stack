import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  github_id: number;

  // github profile JSON string
  @Column()
  raw: string;

  @Column({ default: '' })
  roles: string;
}
