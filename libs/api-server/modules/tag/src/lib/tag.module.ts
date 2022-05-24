import { Module } from '@nestjs/common'

import { SharedModule } from '@nx-blog/api-server/modules/shared'
import { AdminController } from './admin.controller'
import { TagService } from './tag.service'

@Module({
  imports: [SharedModule],
  controllers: [AdminController],
  providers: [TagService],
})
export class TagModule {}
