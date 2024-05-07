import { useState, useEffect } from 'react'
import { message } from 'antd'
import { Pagination } from '~/app/components/pagination'
import { ArticleService, Article, CreateArticleDto } from './article.service'
import { TopicService, Topic } from '../topic/topic.service'

export const useArticle = () => {
  const [topicList, setTopicList] = useState<Topic[]>([])

  useEffect(() => {
    TopicService.getTopicList().then(({ ok, data }) => {
      ok && setTopicList(data)
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
    topicList,
    articleList,
    addArticle,
    updateArticle,
    removeArticle,
  }
}
