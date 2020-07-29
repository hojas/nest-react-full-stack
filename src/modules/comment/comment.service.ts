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
    pageSize,
  }: Pagination<Comment>): Promise<Pagination<Comment>> {
    const [results, count] = await this.commentRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      page,
      pageSize,
      count,
      results,
    };
  }

  async findByArticleId(
    articleId: number,
    { page, pageSize }: Pagination<Comment>,
  ): Promise<Pagination<Comment>> {
    const [results, count] = await this.commentRepository.findAndCount({
      where: { articleId },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      page,
      pageSize,
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
