import {
  Controller,
  Get,
  Param,
  NotFoundException,
  UseFilters,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common'

import { Pagination, PAGE_SIZE } from '@nx-blog/server-types'
import { HttpExceptionFilter } from '@nx-blog/server-filters'
import { Roles } from '@nx-blog/server-decorators'

import { User } from '@prisma/client'
import { UserService } from './user.service'

@Controller('admin/user')
@Roles('admin')
export class AdminController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('page_size', new DefaultValuePipe(PAGE_SIZE), ParseIntPipe)
    page_size: number
  ): Promise<Pagination<User>> {
    return this.userService.findAll({ page, page_size })
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.userService.findById(id)
    if (user) {
      return user
    }

    throw new NotFoundException()
  }
}
