import type { NextPage, NextPageContext } from 'next'
import { Pagination } from '@nx-blog/pagination'
import { ArticleService } from '../../services/article'
import { ArticleList } from '../../components/article-list'

export async function getServerSideProps({ query }: NextPageContext) {
  const { page = 1, code } = query
  const articleList = await ArticleService.getArticleList({
    page: page as number,
    categoryCode: code as string,
  })

  return { props: { articleList } }
}

interface Props {
  articleList: Pagination<Article>
}

const CategoryPage: NextPage<Props> = ({ articleList }) =>
  articleList && <ArticleList articles={articleList.results} />

export default CategoryPage
