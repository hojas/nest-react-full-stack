import { useArticle } from '../hooks/useArticle'
import { HomePage } from '../themes'

export default async function Home() {
  const { getArticleList } = useArticle()
  const articleList = await getArticleList({ page: 1 })

  return <HomePage articleList={articleList} />
}
