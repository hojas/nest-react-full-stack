import {
  Controller,
  Query,
  Param,
  Body,
  HttpCode,
  Get,
  Post,
  Req,
  Put,
  Delete,
  UseFilters,
  NotFoundException,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common'

import { Roles } from '../../decorators/roles.decorator'
import { HttpExceptionFilter } from '../../filters/http-exception.filter'
import { Pagination, PAGE_SIZE } from '../../types/pagination'

import { Article } from '@prisma/client'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './create-article.dto'

@Controller('admin/article')
@Roles('admin')
export class AdminController {
  constructor(private articleService: ArticleService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('page_size', new DefaultValuePipe(PAGE_SIZE), ParseIntPipe)
    pageSize: number
  ): Promise<Pagination<Article>> {
    return this.articleService.findAll({ page, pageSize })
  }

  @Post()
  create(
    @Req() req,
    @Body('article') article: CreateArticleDto
  ): Promise<Article> {
    article.authorId = req.user.id
    return this.articleService.create(article)
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    const article = await this.articleService.findById(id)
    if (article) {
      return article
    }

    throw new NotFoundException()
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
