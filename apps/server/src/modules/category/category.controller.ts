import { Controller, Get, Param } from '@nestjs/common'

import { Public } from '../../decorators/jwt.decorator'
import { Category } from '@prisma/client'
import { CategoryService } from './category.service'

@Public()
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll()
  }

  @Get(':code')
  findByCode(@Param('code') code: string): Promise<Category> {
    return this.categoryService.findByCode(code)
  }
}
