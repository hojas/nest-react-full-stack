import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Post()
  create(@Body('category') category: CategoryDto): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Post(':id')
  update(
    @Param('id') id: number,
    @Body('category') category: CategoryDto,
  ): Promise<Category | null> {
    return this.categoryService.update(id, category);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.categoryService.remove(id);
  }
}
