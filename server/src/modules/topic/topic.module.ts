import { Module } from '@nestjs/common'

import { SharedModule } from '../shared/shared.module'
import { TopicController } from './topic.controller'
import { AdminController } from './admin.controller'
import { TopicService } from './topic.service'

@Module({
  imports: [SharedModule],
  controllers: [TopicController, AdminController],
  providers: [TopicService],
  exports: [TopicService],
})
export class TopicModule {}
