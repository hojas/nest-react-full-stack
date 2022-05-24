import { Injectable } from '@nestjs/common'
import { Article } from '@prisma/client'
import { Pagination } from '@nx-blog/api-server/types'
import { PrismaService } from '@nx-blog/api-server/modules/prisma'
import { CategoryService } from '@nx-blog/api-server/modules/category'
import { CreateArticleDto } from './create-article.dto'

type QueryType = {
  category_code?: string
  tags?: string[]
}

type WhereType = {
  category_id?: number
}

@Injectable()
export class ArticleService {
  constructor(
    private prisma: PrismaService,
    private categoryService: CategoryService
  ) {}

  async findAll(
    { page, page_size }: Pagination<Article>,
    query?: QueryType
  ): Promise<Pagination<Article>> {
    const where: WhereType = {}

    if (query && query.category_code) {
      const category = await this.categoryService.findByCode(
        query.category_code
      )
      where.category_id = category.id
    }

    const articles = await this.prisma.article.findMany({
      where,
      skip: (page - 1) * page_size,
      take: page_size,
      include: {
        category: true,
        author: true,
      },
      orderBy: { created_at: 'desc' },
    })

    return {
      page,
      page_size,
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
    article.tag_ids = article.tag_ids || []

    const data = {
      title: article.title,
      content: article.content || '',
      category: {
        connect: {
          id: article.category_id,
        },
      },
      author: {
        connect: {
          id: article.author_id,
        },
      },
      tags: {
        connect: article.tag_ids.map(id => ({
          id,
        })),
      },
    }

    return this.prisma.article.create({ data })
  }

  update(id: number, article: CreateArticleDto): Promise<Article> {
    article.tag_ids = article.tag_ids || []

    const data = {
      title: article.title,
      content: article.content,
      category: {
        connect: {
          id: article.category_id,
        },
      },
      tags: {
        connect: article.tag_ids.map(id => ({
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
