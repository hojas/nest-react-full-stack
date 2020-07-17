import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  githubId: number;

  // github profile JSON data
  @Column()
  raw: string;
}
