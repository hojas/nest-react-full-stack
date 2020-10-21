import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Delete,
  HttpCode,
  NotFoundException,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { ArticleDto } from './article.dto';
import { PAGE_SIZE } from 'src/constants/pagination';
import { Pagination } from 'src/types/pagination';
import { Roles } from 'src/decorators/role.decorator';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller('admin/articles')
@Roles('admin')
export class AdminController {
  constructor(private articleService: ArticleService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('page_size', new DefaultValuePipe(PAGE_SIZE), ParseIntPipe)
    page_size: number,
  ): Promise<Pagination<Article>> {
    return this.articleService.findAll({ page, page_size });
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  async findById(@Param('id') id: number): Promise<Article> {
    const article = await this.articleService.findById(id);
    if (article) {
      return article;
    }

    throw new NotFoundException();
  }

  @Put(':id')
  @UseFilters(HttpExceptionFilter)
  async update(
    @Param('id') id: number,
    @Body('article') article: ArticleDto,
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
  async remove(@Param('id') id: number): Promise<string> {
    const res = await this.articleService.remove(id);

    if (!res) {
      throw new NotFoundException();
    }

    return '';
  }
}
