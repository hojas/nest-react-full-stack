import { Module } from '@nestjs/common'

import { SharedModule } from '../shared/shared.module'
import { CommentController } from './comment.controller'
import { AdminController } from './admin.controller'
import { CommentService } from './comment.service'

@Module({
  imports: [SharedModule],
  controllers: [CommentController, AdminController],
  providers: [CommentService],
})
export class CommentModule {}
