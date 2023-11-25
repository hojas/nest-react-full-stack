import { Module } from '@nestjs/common'

import { SharedModule } from '../shared/shared.module'
import { TopicModule } from '../topic/topic.module'

import { ArticleController } from './article.controller'
import { AdminController } from './admin.controller'
import { ArticleService } from './article.service'

@Module({
  imports: [SharedModule, TopicModule],
  controllers: [ArticleController, AdminController],
  providers: [ArticleService],
})
export class ArticleModule {}
