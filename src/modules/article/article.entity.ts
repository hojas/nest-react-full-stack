import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  category_id: number;

  @Column()
  author_id: number;

  @Column({ default: '' })
  tags: string;

  @Column({ default: 0 })
  view_count: number;

  @Column({ default: 0 })
  like_count: number;

  @Column({ default: 0 })
  collect_count: number;
}
