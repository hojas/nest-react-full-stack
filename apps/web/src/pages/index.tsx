import type { NextPageContext } from 'next'
import { ArticleService } from '../modules/article/article.service'
import { HomePage } from '../themes'

export async function getServerSideProps({ query }: NextPageContext) {
  const { page = 1 } = query
  const articleList = await ArticleService.getArticleList({
    page: +page,
  })

  return { props: { articleList } }
}

export default HomePage
