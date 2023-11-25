import Link from 'next/link'
import { ArticleMeta } from '../article-meta'
import { ArticleContent } from './article-content'

export const ArticleItem = ({ article }: { article: Article }) => (
  <div className="py-2 my-2">
    <Link
      className="inline-block mb-2 text-neutral-700 text-md font-bold text-decoration-none hover:text-black"
      href={`/article/${article.id}`}
    >
      {article.title}
    </Link>
    <ArticleMeta date={article.createdAt} topicName={article.topic.name} />
    <ArticleContent content={article.content} />
  </div>
)
