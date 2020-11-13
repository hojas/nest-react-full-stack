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
  Req,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ArticleDto } from './article.dto';
import { PAGE_SIZE } from 'src/constants/pagination';
import { Pagination } from 'src/types/pagination';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthReq } from 'src/types/auth-req';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  @UseFilters(HttpExceptionFilter)
  async findAll(
    @Query('category_code')
    category_code: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('page_size', new DefaultValuePipe(PAGE_SIZE), ParseIntPipe)
    page_size: number,
  ): Promise<Pagination<Article>> {
    if (category_code) {
      const res = await this.articleService.findByCategoryCode(category_code, {
        page,
        page_size,
      });

      if (res) {
        return res;
      }

      throw new NotFoundException();
    }

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

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Req() req: AuthReq,
    @Body('article') article: ArticleDto,
  ): Promise<Article> {
    article.author_id = req.user.id;
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
  @UseGuards(JwtAuthGuard)
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
