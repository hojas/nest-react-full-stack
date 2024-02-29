import { useArticle } from '../../../hooks/useArticle'
import { TopicPage } from '../../../themes'

export default async function Topic({ params }: { params: { code: string } }) {
  const { getArticleListByTopic } = useArticle()
  const articleList = await getArticleListByTopic(params.code, { page: 1 })

  return <TopicPage articleList={articleList} />
}
