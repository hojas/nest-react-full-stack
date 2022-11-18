import { Module } from '@nestjs/common'

import { SharedModule } from '../shared/shared.module'
import { AdminController } from './admin.controller'
import { RoleService } from './role.service'

@Module({
  imports: [SharedModule],
  controllers: [AdminController],
  providers: [RoleService],
})
export class RoleModule {}
