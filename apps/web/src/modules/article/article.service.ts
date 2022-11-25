import { $axios } from '../../utils/axios'

const api = {
  list: '/article/',
  detail: (id: number) => `/article/${id}/`,
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
      params: { page, category_code: categoryCode },
    })

    return ok
      ? data
      : {
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
