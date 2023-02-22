import { NextPage } from 'next'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { MarkdownViewer } from '@nest-react-blog/markdown-viewer'
import { Comment } from '@nest-react-blog/comment'
import { ArticleMeta } from '../components/article-item/article-meta'
import { ArticleFooter } from '../components/article/article-footer'

interface Props {
  host: string
  article: Article
}

export const ArticlePage: NextPage<Props> = ({ host, article }) => {
  const router = useRouter()

  return article ? (
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
