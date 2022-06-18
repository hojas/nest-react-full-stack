import { $axios } from '@nx-blog/shared/axios'
import { Pagination } from '@nx-blog/shared/pagination'
import { Category } from '@nx-blog/frontend/services/category'

const api = {
  list: '/article/',
  detail: (id: number) => `/article/${id}/`,
}

export interface Article {
  id: number
  title: string
  content: string
  categoryId: number
  category: Category
  authorId: number
  tags: string[]
  viewCount: number
  likeCount: number
  collectCount: number
  createdAt: string
  updatedAt: string
}

export class ArticleService {
  static async getArticleList({
    page = 1,
    categoryCode = '',
  }: {
    page?: number
    categoryCode?: string
  }) {
    const { ok, data } = await $axios.get<Pagination<Article>>(api.list, {
      params: {
        page,
        category_code: categoryCode,
      },
    })

    if (ok) {
      return data
    }

    return {
      page: 1,
      pageSize: 16,
      total: 0,
      results: [],
    }
  }

  static getArticleById(id: number) {
    return $axios.get<Article>(api.detail(id))
  }
}
