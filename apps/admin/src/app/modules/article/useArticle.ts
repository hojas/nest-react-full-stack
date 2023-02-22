import { useState, useEffect } from 'react'
import { message } from 'antd'
import { Pagination } from '@nest-react-blog/pagination'
import { ArticleService, Article, CreateArticleDto } from './article.service'
import { CategoryService, Category } from '../category/category.service'

export const useArticle = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([])

  useEffect(() => {
    CategoryService.getCategoryList().then(({ ok, data }) => {
      ok && setCategoryList(data)
    })
  }, [])

  const [articleList, setArticleList] = useState<Pagination<Article>>({
    page: 1,
    pageSize: 20,
    total: 0,
    results: [],
  })

  const getArticleList = async () => {
    const { ok, data } = await ArticleService.getArticleList()
    ok && setArticleList(data)
  }

  useEffect(() => {
    getArticleList()
  }, [])

  const addArticle = async (article: CreateArticleDto) => {
    const { ok, message: msg } = await ArticleService.createArticle(article)

    if (ok) {
      getArticleList()
      message.success('添加文章成功')
    } else {
      message.error(msg)
    }

    return ok
  }

  const updateArticle = async (id: number, article: CreateArticleDto) => {
    const { ok, message: msg } = await ArticleService.updateArticle(id, article)

    if (ok) {
      getArticleList()
      message.success('更新文章成功')
    } else {
      message.error(msg)
    }

    return ok
  }

  const removeArticle = async (id: number) => {
    await ArticleService.removeArticle(id)
    getArticleList()
  }

  return {
    categoryList,
    articleList,
    addArticle,
    updateArticle,
    removeArticle,
  }
}
