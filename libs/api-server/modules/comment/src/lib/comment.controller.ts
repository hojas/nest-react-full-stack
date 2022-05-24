import {
  Controller,
  Query,
  Param,
  Body,
  HttpCode,
  Get,
  Post,
  Put,
  Delete,
  Req,
  UseFilters,
  NotFoundException,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common'

import { Public } from '@nx-blog/api-server/decorators'
import { Roles } from '@nx-blog/api-server/decorators'
import { HttpExceptionFilter } from '@nx-blog/api-server/filters'
import { Pagination, PAGE_SIZE } from '@nx-blog/api-server/types'

import { Comment } from '@prisma/client'
import { CreateCommentDto } from './create-comment.dto'
import { CommentService } from './comment.service'

@Public()
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  findAll(
    @Query('article_id', ParseIntPipe) article_id: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('page_size', new DefaultValuePipe(PAGE_SIZE), ParseIntPipe)
    page_size: number
  ): Promise<Pagination<Comment>> {
    return this.commentService.findAll({ page, page_size }, { article_id })
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

  @Roles('user')
  @Post()
  create(
    @Req() req,
    @Body('comment') comment: CreateCommentDto
  ): Promise<Comment> {
    comment.author_id = req.user.id
    return this.commentService.create(comment)
  }

  @Roles('user')
  @Put(':id')
  @UseFilters(HttpExceptionFilter)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('comment') comment: Comment
  ): Promise<Comment> {
    const res = await this.commentService.update(id, comment)
    if (res) {
      return res
    }

    throw new NotFoundException()
  }

  @Roles('user')
  @Delete(':id')
  @HttpCode(204)
  @UseFilters(HttpExceptionFilter)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<null> {
    const res = await this.commentService.remove(id)

    if (!res) {
      throw new NotFoundException()
    }

    return null
  }
}
