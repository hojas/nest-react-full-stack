import { Controller, Get, Param } from '@nestjs/common'

import { Public } from '../../decorators/jwt.decorator'
import { Topic } from '@prisma/client'
import { TopicService } from './topic.service'

@Public()
@Controller('topic')
export class TopicController {
  constructor(private topicService: TopicService) {}

  @Get()
  findAll(): Promise<Topic[]> {
    return this.topicService.findAll()
  }

  @Get(':code')
  findByCode(@Param('code') code: string): Promise<Topic> {
    return this.topicService.findByCode(code)
  }
}
