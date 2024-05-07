import {
  Controller,
  Param,
  Body,
  HttpCode,
  Get,
  Post,
  Put,
  Delete,
  UseFilters,
  NotFoundException,
  ParseIntPipe,
  HttpStatus,
  HttpException,
} from '@nestjs/common'
import { Topic } from '@prisma/client'

import { Roles } from '../../decorators/roles.decorator'
import { HttpExceptionFilter } from '../../filters/http-exception.filter'
import { getCustomErrorMessage } from '../../utils/prisma-errors'
import { CreateTopicDto } from './create-topic.dto'
import { TopicService } from './topic.service'

@Roles('admin')
@Controller('admin/topic')
export class AdminController {
  constructor(private topicService: TopicService) {}

  @Get()
  findAll(): Promise<Topic[]> {
    return this.topicService.findAll()
  }

  @Post()
  async create(
    @Body('topic') topic: CreateTopicDto
  ): Promise<Topic> {
    try {
      return await this.topicService.create(topic)
    } catch (error) {
      throw new HttpException(
        getCustomErrorMessage(error.code, '分类'),
        HttpStatus.BAD_REQUEST
      )
    }
  }

  @Put(':id')
  @UseFilters(HttpExceptionFilter)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('topic') topic: Topic
  ): Promise<Topic> {
    const res = await this.topicService.update(id, topic)
    if (res) {
      return res
    }

    throw new NotFoundException()
  }

  @Delete(':id')
  @HttpCode(204)
  @UseFilters(HttpExceptionFilter)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Topic> {
    const res = await this.topicService.remove(+id)
    if (res) {
      return res
    }

    throw new NotFoundException()
  }
}
