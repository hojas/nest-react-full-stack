import {
  Controller,
  Query,
  Param,
  HttpCode,
  Get,
  Post,
  Delete,
  UseFilters,
  NotFoundException,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common'

import { Roles } from '../../decorators/roles.decorator'
import { HttpExceptionFilter } from '../../filters/http-exception.filter'
import { Pagination, PAGE_SIZE } from '../../types/pagination'

import { Comment, CommentStatus } from '@prisma/client'
import { CommentService } from './comment.service'

@Roles('admin')
@Controller('admin/comment')
export class AdminController {
  constructor(private commentService: CommentService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('page_size', new DefaultValuePipe(PAGE_SIZE), ParseIntPipe)
    pageSize: number
  ): Promise<Pagination<Comment>> {
    return this.commentService.findAll({ page, pageSize })
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Comment> {
    const comment = await this.commentService.findById(id)
    if (comment) {
      return comment
    }

    throw new NotFoundException()
  }

  @Post(':id/resolve')
  @UseFilters(HttpExceptionFilter)
  async resolve(@Param('id', ParseIntPipe) id: number): Promise<Comment> {
    const comment = await this.commentService.findById(id)

    if (comment) {
      comment.status = CommentStatus.RESOLVED
      return this.commentService.update(id, comment)
    }

    throw new NotFoundException()
  }

  @Post(':id/reject')
  @UseFilters(HttpExceptionFilter)
  async reject(@Param('id', ParseIntPipe) id: number): Promise<Comment> {
    const comment = await this.commentService.findById(id)

    if (comment) {
      comment.status = CommentStatus.REJECTED
      return this.commentService.update(id, comment)
    }

    throw new NotFoundException()
  }

  @Delete(':id')
  @HttpCode(204)
  @UseFilters(HttpExceptionFilter)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const res = await this.commentService.remove(id)

    if (!res) {
      throw new NotFoundException()
    }

    return ''
  }
}
