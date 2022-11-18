import { Injectable } from '@nestjs/common'
import { Article } from '@prisma/client'
import { Pagination } from '../../types/pagination'
import { PrismaService } from '../prisma/prisma.service'
import { CategoryService } from '../category/category.service'
import { CreateArticleDto } from './create-article.dto'

type QueryType = {
  categoryCode?: string
  tags?: string[]
}

type WhereType = {
  categoryId?: number
}

@Injectable()
export class ArticleService {
  constructor(
    private prisma: PrismaService,
    private categoryService: CategoryService
  ) {}

  async findAll(
    { page, pageSize }: Pagination<Article>,
    query?: QueryType
  ): Promise<Pagination<Article>> {
    const where: WhereType = {}

    if (query && query.categoryCode) {
      const category = await this.categoryService.findByCode(query.categoryCode)
      where.categoryId = category ? category.id : 0
    }

    const articles = await this.prisma.article.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        category: true,
        author: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return {
      page,
      pageSize,
      count: articles.length,
      results: articles,
    }
  }

  findById(id: number): Promise<Article> {
    return this.prisma.article.findUnique({
      where: { id },
      include: {
        category: true,
        author: true,
      },
    })
  }

  create(article: CreateArticleDto): Promise<Article> {
    article.tagIds = article.tagIds || []

    const data = {
      title: article.title,
      content: article.content || '',
      category: {
        connect: {
          id: article.categoryId,
        },
      },
      author: {
        connect: {
          id: article.authorId,
        },
      },
      tags: {
        connect: article.tagIds.map(id => ({
          id,
        })),
      },
    }

    return this.prisma.article.create({ data })
  }

  update(id: number, article: CreateArticleDto): Promise<Article> {
    article.tagIds = article.tagIds || []

    const data = {
      title: article.title,
      content: article.content,
      category: {
        connect: {
          id: article.categoryId,
        },
      },
      tags: {
        connect: article.tagIds.map(id => ({
          id,
        })),
      },
    }

    return this.prisma.article.update({ where: { id }, data })
  }

  remove(id: number): Promise<Article> {
    return this.prisma.article.delete({ where: { id } })
  }
}
