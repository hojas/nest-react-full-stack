import { getApiUrl, getList, getItem } from '../utils/request'

const api = {
  list: '/article/',
  detail: (id: number) => `/article/${id}/`,
}

interface Query {
  page?: number
  pageSize?: number
}

export function useArticle() {
  async function getArticleList(query: Query = { page: 1 }) {
    const url = getApiUrl(api.list, query)
    return getList(url)
  }

  async function getArticleListByTopic(
    topic: string,
    query: Query = { page: 1 },
  ) {
    const url = getApiUrl(api.list, { ...query, topic })
    return getList(url)
  }

  async function getArticleById(id: number) {
    const url = getApiUrl(api.detail(id))
    return getItem(url)
  }

  return {
    getArticleList,
    getArticleListByTopic,
    getArticleById,
  }
}
