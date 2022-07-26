import type { NextPage, NextPageContext } from 'next'
import { Pagination } from '@nx-blog/shared/pagination'
import { Article, ArticleService } from '@nx-blog/web-services-article'
import { ArticleList } from '@nx-blog/web-ui'

export async function getServerSideProps({ query }: NextPageContext) {
  const { page = 1 } = query
  const articleList = await ArticleService.getArticleList({
    page: Number(page),
  })

  return { props: { articleList } }
}

interface Props {
  articleList: Pagination<Article>
}

export const HomePage: NextPage<Props> = ({ articleList }) =>
  articleList && <ArticleList articles={articleList.results} />
