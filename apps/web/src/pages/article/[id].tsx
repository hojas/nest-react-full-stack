import type { NextPageContext } from 'next'
import { ArticleService } from '../../modules/article/article.service'
import { ArticlePage } from '../../themes'

export async function getServerSideProps({ req, query }: NextPageContext) {
  const { host = '' } = req?.headers ?? {}
  const { id = 0 } = query
  const { data } = await ArticleService.getArticleById(+id)

  return { props: { host, article: data } }
}

export default ArticlePage
