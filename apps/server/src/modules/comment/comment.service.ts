import { Injectable } from '@nestjs/common'

import { Comment } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { Pagination } from '../../types/pagination'
import { CreateCommentDto } from './create-comment.dto'

type QueryType = {
  articleId?: number
}

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    { page, pageSize }: Pagination<Comment>,
    query?: QueryType
  ): Promise<Pagination<Comment>> {
    const where = query

    const comments = await this.prisma.comment.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    })

    return {
      page,
      pageSize,
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
        connect: { id: comment.authorId },
      },
      article: {
        connect: { id: comment.articleId },
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
