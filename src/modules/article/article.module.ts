import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/modules/category/category.module';
import { Article } from './article.entity';
import { ArticleController } from './article.controller';
import { AdminController } from './admin.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), CategoryModule],
  controllers: [ArticleController, AdminController],
  providers: [ArticleService],
})
export class ArticleModule {}
