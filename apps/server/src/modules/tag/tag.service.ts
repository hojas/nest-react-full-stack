import { Injectable } from '@nestjs/common'

import { Pagination } from '../../types/pagination'
import { PrismaService } from '../prisma/prisma.service'
import { Tag } from '@prisma/client'
import { CreateTagDto } from './create-tag.dto'

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    page,
    pageSize,
  }: Pagination<Tag>): Promise<Pagination<Tag>> {
    const tags = await this.prisma.tag.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    })

    return {
      page,
      pageSize,
      count: tags.length,
      results: tags,
    }
  }

  create(tag: CreateTagDto): Promise<Tag> {
    return this.prisma.tag.create({ data: tag })
  }

  async update(id: number, tag: Tag): Promise<Tag> {
    return this.prisma.tag.update({ where: { id }, data: tag })
  }

  async remove(id: number): Promise<Tag> {
    return this.prisma.tag.delete({ where: { id } })
  }
}
