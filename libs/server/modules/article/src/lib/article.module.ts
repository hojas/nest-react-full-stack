import { Module } from '@nestjs/common'

import { SharedModule } from '@nx-blog/server-modules-shared'
import { CategoryModule } from '@nx-blog/server-modules-category'

import { ArticleController } from './article.controller'
import { AdminController } from './admin.controller'
import { ArticleService } from './article.service'

@Module({
  imports: [SharedModule, CategoryModule],
  controllers: [ArticleController, AdminController],
  providers: [ArticleService],
})
export class ArticleModule {}
