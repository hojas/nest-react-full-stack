import { useArticle } from '../../../hooks/useArticle'
import { ArticlePage } from '../../../themes'

interface Props {
  params: {
    id: string
  }
}

export default async function Article({ params }: Props) {
  const { getArticleById } = useArticle()
  const article = await getArticleById(Number(params.id))
  if (!article) {
    return <div>404</div>
  }
  return <ArticlePage article={article} host={''} />
}
