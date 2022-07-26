import {
  Controller,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseFilters,
  NotFoundException,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common'

import { Roles } from '@nx-blog/server-decorators'
import { HttpExceptionFilter } from '@nx-blog/server-filters'
import { Pagination, PAGE_SIZE } from '@nx-blog/server-types'

import { Tag } from '@prisma/client'
import { CreateTagDto } from './create-tag.dto'
import { TagService } from './tag.service'

@Roles('admin')
@Controller('tag')
export class AdminController {
  constructor(private tagService: TagService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('page_size', new DefaultValuePipe(PAGE_SIZE), ParseIntPipe)
    page_size: number
  ): Promise<Pagination<Tag>> {
    return this.tagService.findAll({ page, page_size })
  }

  @Post()
  create(@Body('tag') tag: CreateTagDto): Promise<Tag> {
    return this.tagService.create(tag)
  }

  @Put(':id')
  @UseFilters(HttpExceptionFilter)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('tag') tag: Tag
  ): Promise<Tag> {
    const res = await this.tagService.update(id, tag)
    if (res) {
      return res
    }

    throw new NotFoundException()
  }

  @Delete(':id')
  @HttpCode(204)
  @UseFilters(HttpExceptionFilter)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<null> {
    const res = await this.tagService.remove(id)

    if (!res) {
      throw new NotFoundException()
    }

    return null
  }
}
