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
} from '@nestjs/common'

import { Public } from '@nx-blog/api-server/decorators'
import { HttpExceptionFilter } from '@nx-blog/api-server/filters'
import { Pagination, PAGE_SIZE } from '@nx-blog/api-server/types'

import { Article } from '@prisma/client'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './create-article.dto'

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Public()
  @Get()
  @UseFilters(HttpExceptionFilter)
  async findAll(
    @Query('category_code')
    category_code: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('page_size', new DefaultValuePipe(PAGE_SIZE), ParseIntPipe)
    page_size: number
  ): Promise<Pagination<Article>> {
    return this.articleService.findAll({ page, page_size }, { category_code })
  }

  @Public()
  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    const article = await this.articleService.findById(id)
    if (article) {
      return article
    }

    throw new NotFoundException()
  }

  @Post()
  create(
    @Req() req,
    @Body('article') article: CreateArticleDto
  ): Promise<Article> {
    article.author_id = req.user.id
    return this.articleService.create(article)
  }

  @Put(':id')
  @UseFilters(HttpExceptionFilter)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('article') article: CreateArticleDto
  ): Promise<Article> {
    const res = await this.articleService.update(id, article)
    if (res) {
      return res
    }

    throw new NotFoundException()
  }

  @Delete(':id')
  @HttpCode(204)
  @UseFilters(HttpExceptionFilter)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<null> {
    const res = await this.articleService.remove(id)

    if (!res) {
      throw new NotFoundException()
    }

    return null
  }
}
