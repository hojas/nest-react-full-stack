import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Category } from './category.entity';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findById(id: number): Promise<Category> {
    return this.categoryRepository.findOne(id);
  }

  findByCode(code: string): Promise<Category> {
    return this.categoryRepository.findOne({ code });
  }

  create(category: CategoryDto): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  async update(id: number, category: CategoryDto): Promise<Category> {
    const c = await this.findById(id);
    if (c) {
      await this.categoryRepository.update(c.id, category);
      return { ...c, ...category };
    }

    return null;
  }

  remove(id: number): Promise<DeleteResult> {
    const c = this.findById(id);
    if (c) {
      return this.categoryRepository.delete(id);
    }

    return null;
  }
}
