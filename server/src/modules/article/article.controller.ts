import {
  Controller,
  Query,
  Param,
  Body,
  HttpCode,
  Get,
  Post,
  Put,
  Delete,
  Req,
  UseFilters,
  NotFoundException,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';

import { Public } from '../../decorators/jwt.decorator';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { Pagination, PAGE_SIZE } from '../../types/pagination';

import { Article } from '@prisma/client';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Public()
  @Get()
  @UseFilters(HttpExceptionFilter)
  async findAll(
    @Query('topic_code')
    topicCode: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('page_size', new DefaultValuePipe(PAGE_SIZE), ParseIntPipe)
    pageSize: number,
  ): Promise<Pagination<Article>> {
    return this.articleService.findAll({ page, pageSize }, { topicCode });
  }

  @Public()
  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    const article = await this.articleService.findById(id);
    if (article) {
      return article;
    }

    throw new NotFoundException();
  }

  @Post()
  create(
    @Req() req,
    @Body('article') article: CreateArticleDto,
  ): Promise<Article> {
    article.authorId = req.user.id;
    return this.articleService.create(article);
  }

  @Put(':id')
  @UseFilters(HttpExceptionFilter)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('article') article: CreateArticleDto,
  ): Promise<Article> {
    const res = await this.articleService.update(id, article);
    if (res) {
      return res;
    }

    throw new NotFoundException();
  }

  @Delete(':id')
  @HttpCode(204)
  @UseFilters(HttpExceptionFilter)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<null> {
    const res = await this.articleService.remove(id);

    if (!res) {
      throw new NotFoundException();
    }

    return null;
  }
}
