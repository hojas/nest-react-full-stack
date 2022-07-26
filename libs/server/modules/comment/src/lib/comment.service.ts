import { Injectable } from '@nestjs/common'

import { Comment } from '@prisma/client'
import { PrismaService } from '@nx-blog/server-modules-prisma'
import { Pagination } from '@nx-blog/server-types'
import { CreateCommentDto } from './create-comment.dto'

type QueryType = {
  article_id?: number
}

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    { page, page_size }: Pagination<Comment>,
    query?: QueryType
  ): Promise<Pagination<Comment>> {
    const where = query

    const comments = await this.prisma.comment.findMany({
      where,
      skip: (page - 1) * page_size,
      take: page_size,
      orderBy: { created_at: 'desc' },
    })

    return {
      page,
      page_size,
      count: comments.length,
      results: comments,
    }
  }

  findById(id: number): Promise<Comment> {
    return this.prisma.comment.findUnique({ where: { id } })
  }

  create(comment: CreateCommentDto): Promise<Comment> {
    const data = {
      content: comment.content,
      author: {
        connect: { id: comment.author_id },
      },
      article: {
        connect: { id: comment.article_id },
      },
    }

    return this.prisma.comment.create({ data })
  }

  async update(id: number, comment: Comment): Promise<Comment> {
    const data = {
      content: comment.content,
    }

    return this.prisma.comment.update({ where: { id }, data })
  }

  async remove(id: number): Promise<Comment> {
    return this.prisma.comment.delete({ where: { id } })
  }
}
