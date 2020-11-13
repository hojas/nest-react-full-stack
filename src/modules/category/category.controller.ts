import { Controller, Get, Param } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':code')
  findByCode(@Param('code') code: string): Promise<Category> {
    return this.categoryService.findByCode(code);
  }
}
