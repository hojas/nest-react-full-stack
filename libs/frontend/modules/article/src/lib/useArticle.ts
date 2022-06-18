import { useState, useEffect } from 'react'
import { Pagination } from '@nx-blog/shared/pagination'
import { Article, ArticleService } from '@nx-blog/frontend/services/article'

export const useArticleList = (page = 1) => {
  const [articleList, setArticleList] = useState<Pagination<Article>>({
    page: 1,
    pageSize: 16,
    total: 0,
    results: [],
  })

  useEffect(() => {
    const fetchArticleList = async () => {
      const list = await ArticleService.getArticleList({ page })
      setArticleList(list)
    }

    fetchArticleList()
  }, [articleList])

  return { articleList }
}

export const useArticle = (id: number) => {
  const [article, setArticle] = useState<Article>()

  useEffect(() => {
    const fetchArticle = async () => {
      const { ok, data } = await ArticleService.getArticleById(id)
      ok && setArticle(data)
    }

    if (id > 0) {
      fetchArticle()
    }
  }, [id])

  return { article }
}
