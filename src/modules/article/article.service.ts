import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Article } from './article.entity';
import { ArticleDto } from './article.dto';
import { Pagination } from 'src/types/pagination';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async findAll({
    page,
    pageSize,
  }: Pagination<Article>): Promise<Pagination<Article>> {
    const [results, count] = await this.articleRepository.findAndCount({
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

  findById(id: number): Promise<Article> {
    return this.articleRepository.findOne(id);
  }

  create(article: ArticleDto): Promise<Article> {
    return this.articleRepository.save(article);
  }

  async update(id: number, article: ArticleDto): Promise<Article | null> {
    const a = await this.findById(id);
    if (a) {
      return this.articleRepository.save(article);
    }

    return null;
  }

  remove(id: number): Promise<DeleteResult> {
    return this.articleRepository.delete(id);
  }
}
