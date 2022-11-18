import { Module } from '@nestjs/common'

import { SharedModule } from '../shared/shared.module'
import { CategoryController } from './category.controller'
import { AdminController } from './admin.controller'
import { CategoryService } from './category.service'

@Module({
  imports: [SharedModule],
  controllers: [CategoryController, AdminController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
