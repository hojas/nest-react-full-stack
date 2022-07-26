import {
  Controller,
  Get,
  Param,
  NotFoundException,
  UseFilters,
  ParseIntPipe,
} from '@nestjs/common'

import { User } from '@prisma/client'
import { Public } from '@nx-blog/server-decorators'
import { HttpExceptionFilter } from '@nx-blog/server-filters'
import { UserService } from './user.service'

@Public()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

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
