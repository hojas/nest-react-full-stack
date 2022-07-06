import { $axios } from '@nx-blog/shared/axios'
import { Pagination } from '@nx-blog/shared/pagination'

const api = {
  list: '/admin/article/',
  detail: (id: number) => `/admin/article/${id}/`,
}

export interface CreateArticleDto {
  title: string
  content: string
  categoryId: number
}

export interface Article extends CreateArticleDto {
  id: number
  author_id: number
  createdAt: string
}

export class ArticleService {
  static getArticleList() {
    return $axios.get<Pagination<Article>>(api.list)
  }

  static createArticle(article: CreateArticleDto) {
    return $axios.post<Article>(api.list, { article })
  }

  static updateArticle(id: number, article: CreateArticleDto) {
    return $axios.put<Article>(api.detail(id), { article })
  }

  static removeArticle(id: number) {
    return $axios.delete<Article>(api.detail(id))
  }
}
