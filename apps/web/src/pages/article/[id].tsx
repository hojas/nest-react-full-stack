import type { NextPage, NextPageContext } from 'next'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

import { MarkdownViewer } from '@nx-blog/markdown-viewer'
import { Comment } from '@nx-blog/comment'
import { ArticleService } from '../../services/article'
import { ArticleMeta } from '../../components/article-list/article-meta'
import { ArticleFooter } from '../../components/article-footer'

export async function getServerSideProps({ req, query }: NextPageContext) {
  const { host = '' } = req?.headers ?? {}
  const { id = 0 } = query
  const { ok, data } = await ArticleService.getArticleById(+id)

  return { props: { host, ok, article: data } }
}

interface Props {
  ok: boolean
  article: Article
  host: string
}

const ArticlePage: NextPage<Props> = ({ ok, article, host }) => {
  const router = useRouter()

  return ok && article ? (
    <article className="prose prose-slate p-10 max-w-none bg-base-100 rounded-box shadow-md">
      <h1 className="mb-3 pb-6 text-center border-b">{article.title}</h1>
      <ArticleMeta
        className="justify-center mb-10"
        date={article.createdAt}
        categoryName={article.category.name}
      />
      <MarkdownViewer content={article.content} />
      <ArticleFooter
        host={host}
        path={router.asPath}
        date={article.createdAt}
      />
      <Comment />
    </article>
  ) : (
    <ErrorPage statusCode={404} />
  )
}

export default ArticlePage
