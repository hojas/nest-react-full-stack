import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CategoryService } from 'src/modules/category/category.service';
import { Article } from './article.entity';
import { ArticleDto } from './article.dto';
import { Pagination } from 'src/types/pagination';

@Injectable()
export class ArticleService {
  constructor(
    private categoryService: CategoryService,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async findAll({
    page,
    page_size,
  }: Pagination<Article>): Promise<Pagination<Article>> {
    const [results, count] = await this.articleRepository.findAndCount({
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

  async findByCategoryCode(
    category_code: string,
    { page, page_size }: Pagination<Article>,
  ): Promise<Pagination<Article>> {
    const category = await this.categoryService.findByCode(category_code);

    if (category) {
      const [results, count] = await this.articleRepository.findAndCount({
        where: { category_id: category.id },
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

    return null;
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
