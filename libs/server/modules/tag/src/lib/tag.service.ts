import { Injectable } from '@nestjs/common'

import { Pagination } from '@nx-blog/server-types'
import { PrismaService } from '@nx-blog/server-modules-prisma'
import { Tag } from '@prisma/client'
import { CreateTagDto } from './create-tag.dto'

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    page,
    page_size,
  }: Pagination<Tag>): Promise<Pagination<Tag>> {
    const tags = await this.prisma.tag.findMany({
      skip: (page - 1) * page_size,
      take: page_size,
      orderBy: { created_at: 'desc' },
    })

    return {
      page,
      page_size,
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
