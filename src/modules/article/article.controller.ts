import {
  Controller,
  UseGuards,
  Get,
  Param,
  Post,
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
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ArticleDto } from './article.dto';
import { PAGE_SIZE } from 'src/constants/pagination';
import { Pagination } from 'src/types/pagination';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('page_size', new DefaultValuePipe(PAGE_SIZE), ParseIntPipe)
    pageSize: number,
  ): Promise<Pagination<Article>> {
    return this.articleService.findAll({ page, pageSize });
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

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body('article') article: ArticleDto): Promise<Article> {
    return this.articleService.create(article);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptionFilter)
  async remove(@Param('id') id: number): Promise<string> {
    const res = await this.articleService.remove(id);

    if (!res) {
      throw new NotFoundException();
    }

    return '';
  }
}
