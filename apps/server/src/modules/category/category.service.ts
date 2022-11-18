import { Injectable } from '@nestjs/common'
import { Category } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateCategoryDto } from './create-category.dto'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Category[]> {
    return this.prisma.category.findMany({
      orderBy: { orderIndex: 'asc' },
    })
  }

  findById(id: number): Promise<Category> {
    return this.prisma.category.findUnique({ where: { id } })
  }

  findByCode(code: string): Promise<Category> {
    return this.prisma.category.findUnique({ where: { code } })
  }

  create(category: CreateCategoryDto): Promise<Category> {
    return this.prisma.category.create({ data: category })
  }

  async update(id: number, category: Category): Promise<Category> {
    return this.prisma.category.update({ where: { id }, data: category })
  }

  remove(id: number): Promise<Category> {
    return this.prisma.category.delete({ where: { id } })
  }
}
