import type { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { format } from 'date-fns'
import { Article, ArticleService } from '@nx-blog/frontend/services/article'
import { MarkdownViewer } from '@nx-blog/shared/markdown-viewer'

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
    <article className="prose prose-slate max-w-none prose-pre:bg-[#fff]">
      <h1 className="text-[26px] text-center">{article.title}</h1>
      <div className="flex justify-center pb-[20px] text-[14px]">
        <div>{format(new Date(article.createdAt), 'yyyy年MM月dd日')}</div>
        <div className="mx-[10px]">·</div>
        <div>{article.category.name}</div>
      </div>
      <MarkdownViewer content={article.content} />
      <div>
        本文地址：
        <a href={host + router.asPath}>{host + router.asPath}</a>
      </div>
    </article>
  ) : (
    <ErrorPage statusCode={404} />
  )
}
