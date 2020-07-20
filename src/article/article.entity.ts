import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  tags: string;

  @Column()
  categoryId: number;

  @Column()
  authorId: number;

  @Column()
  viewCount: number;

  @Column()
  likeCount: number;

  @Column()
  collectCount: number;
}
