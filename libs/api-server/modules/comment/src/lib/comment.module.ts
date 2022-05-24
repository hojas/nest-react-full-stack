import { Module } from '@nestjs/common'

import { SharedModule } from '@nx-blog/api-server/modules/shared'
import { CommentController } from './comment.controller'
import { AdminController } from './admin.controller'
import { CommentService } from './comment.service'

@Module({
  imports: [SharedModule],
  controllers: [CommentController, AdminController],
  providers: [CommentService],
})
export class CommentModule {}
