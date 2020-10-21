import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Pagination } from 'src/types/pagination';
import { Comment } from './comment.entity';
import { CommentDto } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async findAll({
    page,
    page_size,
  }: Pagination<Comment>): Promise<Pagination<Comment>> {
    const [results, count] = await this.commentRepository.findAndCount({
      skip: (page - 1) * page_size,
      take: page_size,
    });

    return {
      page,
      page_size,
      count,
      results,
    };
  }

  async findByArticleId(
    article_id: number,
    { page, page_size }: Pagination<Comment>,
  ): Promise<Pagination<Comment>> {
    const [results, count] = await this.commentRepository.findAndCount({
      where: { article_id },
      skip: (page - 1) * page_size,
      take: page_size,
    });

    return {
      page,
      page_size,
      count,
      results,
    };
  }

  findById(id: number): Promise<Comment> {
    return this.commentRepository.findOne(id);
  }

  create(comment: CommentDto): Promise<Comment> {
    return this.commentRepository.save(comment);
  }

  async update(id: number, comment: CommentDto): Promise<Comment | null> {
    const c = await this.findById(id);
    if (c) {
      return this.commentRepository.save({ ...comment, id: c.id });
    }

    return null;
  }

  async remove(id: number): Promise<DeleteResult | null> {
    const c = await this.findById(id);
    if (c) {
      return this.commentRepository.delete(id);
    }

    return null;
  }
}
