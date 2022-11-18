import { Module } from '@nestjs/common'

import { SharedModule } from '../shared/shared.module'
import { AdminController } from './admin.controller'
import { TagService } from './tag.service'

@Module({
  imports: [SharedModule],
  controllers: [AdminController],
  providers: [TagService],
})
export class TagModule {}
