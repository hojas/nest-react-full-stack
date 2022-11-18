import {
  Controller,
  Param,
  Body,
  HttpCode,
  Get,
  Post,
  Put,
  Delete,
  UseFilters,
  NotFoundException,
  ParseIntPipe,
  HttpStatus,
  HttpException,
} from '@nestjs/common'
import { Category } from '@prisma/client'

import { Roles } from '../../decorators/roles.decorator'
import { HttpExceptionFilter } from '../../filters/http-exception.filter'
import { getCustomErrorMessage } from '../../utils/prisma-errors'
import { CreateCategoryDto } from './create-category.dto'
import { CategoryService } from './category.service'

@Roles('admin')
@Controller('admin/category')
export class AdminController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll()
  }

  @Post()
  async create(
    @Body('category') category: CreateCategoryDto
  ): Promise<Category> {
    try {
      return await this.categoryService.create(category)
    } catch (error) {
      throw new HttpException(
        getCustomErrorMessage(error.code, '分类'),
        HttpStatus.BAD_REQUEST
      )
    }
  }

  @Put(':id')
  @UseFilters(HttpExceptionFilter)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('category') category: Category
  ): Promise<Category> {
    const res = await this.categoryService.update(id, category)
    if (res) {
      return res
    }

    throw new NotFoundException()
  }

  @Delete(':id')
  @HttpCode(204)
  @UseFilters(HttpExceptionFilter)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    const res = await this.categoryService.remove(+id)
    if (res) {
      return res
    }

    throw new NotFoundException()
  }
}
