import type { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { format } from 'date-fns'
import { BiCopyright, BiTimeFive, BiLink } from 'react-icons/bi'
import { Article, ArticleService } from '@nx-blog/frontend/services/article'
import { MarkdownViewer } from '@nx-blog/shared/markdown-viewer'
import { ArticleMeta } from '@nx-blog/frontend/ui'

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

const ArticlePageFooter = ({
  host,
  path,
  date,
}: {
  host: string
  path: string
  date: string
}) => (
  <div className="mt-10 pt-5 text-sm text-primary-focus border-t grid gap-y-1">
    <div className="flex items-center gap-1">
      <BiCopyright />
      <div>
        版权声明：自由转载-非商用-非衍生-保持署名（
        <a
          className="text-primary-focus"
          href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          创意共享3.0许可证
        </a>
      </div>
      ）
    </div>
    <div className="flex items-center gap-1">
      <BiTimeFive />
      <div>
        发布日期：
        {format(new Date(date), 'yyyy年MM月dd日')}
      </div>
    </div>
    <div className="flex items-center gap-1">
      <BiLink />
      <div>
        本文地址：
        <a className="text-primary-focus" href={host + path}>
          {host + path}
        </a>
      </div>
    </div>
  </div>
)

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
      <p>（完）</p>
      <ArticlePageFooter
        host={host}
        path={router.asPath}
        date={article.createdAt}
      />
    </article>
  ) : (
    <ErrorPage statusCode={404} />
  )
}
