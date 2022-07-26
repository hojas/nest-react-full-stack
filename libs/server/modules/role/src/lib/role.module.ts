import { Module } from '@nestjs/common'

import { SharedModule } from '@nx-blog/server-modules-shared'
import { AdminController } from './admin.controller'
import { RoleService } from './role.service'

@Module({
  imports: [SharedModule],
  controllers: [AdminController],
  providers: [RoleService],
})
export class RoleModule {}
