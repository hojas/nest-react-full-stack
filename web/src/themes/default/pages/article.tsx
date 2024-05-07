'use client'

import { NextPage } from 'next'
import { usePathname } from 'next/navigation'
import ErrorPage from 'next/error'
import { MarkdownViewer } from '@/components/markdown-viewer'
import { ArticleMeta } from '../components/article-meta'
import { ArticleFooter } from '../components/article/article-footer'

interface Props {
  host: string
  article: Article
}

export const ArticlePage: NextPage<Props> = ({ host, article }) => {
  const pathname = usePathname()

  return article ? (
    <article>
      <h1 className="mb-4 text-center text-[36px]">{article.title}</h1>
      <ArticleMeta
        className="justify-center mb-4"
        date={article.createdAt}
        topicName={article.topic.name}
      />
      <MarkdownViewer content={article.content} />
      <ArticleFooter host={host} path={pathname} />
    </article>
  ) : (
    <ErrorPage statusCode={404} />
  )
}
