import type { NextPageContext } from 'next'
import { ArticleService } from '../../modules/article/article.service'
import { CategoryPage } from '../../themes'

export async function getServerSideProps({ query }: NextPageContext) {
  const { page = 1, code } = query
  const articleList = await ArticleService.getArticleList({
    page: page as number,
    categoryCode: code as string,
  })

  return { props: { articleList } }
}

export default CategoryPage
