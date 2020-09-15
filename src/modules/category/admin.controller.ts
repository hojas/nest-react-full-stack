import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  UseFilters,
  Put,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Roles } from 'src/decorators/role.decorator';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { Category } from './category.entity';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@Controller('admin/categories')
@Roles('admin')
export class AdminController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Post()
  create(@Body('category') category: CategoryDto): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Put(':id')
  @UseFilters(HttpExceptionFilter)
  async update(
    @Param('id') id: number,
    @Body('category') category: CategoryDto,
  ): Promise<Category | null> {
    const res = await this.categoryService.update(id, category);
    if (res) {
      return res;
    }

    throw new NotFoundException();
  }

  @Delete(':id')
  @HttpCode(204)
  @UseFilters(HttpExceptionFilter)
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    const res = await this.categoryService.remove(id);
    if (res) {
      return res;
    }

    throw new NotFoundException();
  }
}
