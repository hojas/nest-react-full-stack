import Link from 'next/link'
import { ArticleTitle } from './article-title'
import { ArticleContent } from './article-content'
import { ArticleMeta } from './article-meta'

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
