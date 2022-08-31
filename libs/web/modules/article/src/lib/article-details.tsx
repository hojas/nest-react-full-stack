import type { NextPage, NextPageContext } from 'next'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

import { Article, ArticleService } from '@nx-blog/web/services/article'
import { MarkdownViewer } from '@nx-blog/shared/markdown-viewer'
import { ArticleMeta } from '@nx-blog/web/ui'
import { ArticleFooter } from './article-footer'

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

export const ArticlePage: NextPage<Props> = ({ ok, article, host }) => {
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
    </article>
  ) : (
    <ErrorPage statusCode={404} />
  )
}
