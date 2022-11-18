import { Module } from '@nestjs/common'

import { SharedModule } from '../shared/shared.module'
import { CategoryModule } from '../category/category.module'

import { ArticleController } from './article.controller'
import { AdminController } from './admin.controller'
import { ArticleService } from './article.service'

@Module({
  imports: [SharedModule, CategoryModule],
  controllers: [ArticleController, AdminController],
  providers: [ArticleService],
})
export class ArticleModule {}
