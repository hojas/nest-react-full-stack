import { Injectable } from '@nestjs/common'
import { Topic } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTopicDto } from './create-topic.dto'

@Injectable()
export class TopicService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Topic[]> {
    return this.prisma.topic.findMany({
      orderBy: { orderIndex: 'asc' },
    })
  }

  findById(id: number): Promise<Topic> {
    return this.prisma.topic.findUnique({ where: { id } })
  }

  findByCode(code: string): Promise<Topic> {
    return this.prisma.topic.findUnique({ where: { code } })
  }

  create(topic: CreateTopicDto): Promise<Topic> {
    return this.prisma.topic.create({ data: topic })
  }

  async update(id: number, topic: Topic): Promise<Topic> {
    return this.prisma.topic.update({ where: { id }, data: topic })
  }

  remove(id: number): Promise<Topic> {
    return this.prisma.topic.delete({ where: { id } })
  }
}
