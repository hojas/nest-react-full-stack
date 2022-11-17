import Link from 'next/link'
import removeMarkdown from 'remove-markdown'
import { ArticleMeta } from './article-meta'

const ArticleTitle = ({ title }: { title: string }) => (
  <h2 className="mb-2 text-base-content text-2xl font-bold">{title}</h2>
)

const ArticleContent = ({ content }: { content: string }) => (
  <div className="text-primary-focus line-clamp-2">
    {removeMarkdown(content)}
  </div>
)

export const ArticleItem = ({ article }: { article: Article }) => (
  <Link
    className="flex justify-between p-5 rounded-box cursor-pointer transition hover:bg-base-200 hover:shadow"
    href={`/article/${article.id}`}
  >
    <div className="flex flex-col justify-between">
      <div className="mb-6">
        <ArticleTitle title={article.title} />
        <ArticleContent content={article.content} />
      </div>
      <ArticleMeta
        date={article.createdAt}
        categoryName={article.category.name}
      />
    </div>
  </Link>
)
