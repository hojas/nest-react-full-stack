import { ArticleMetaDate } from './article-meta-date'
import { ArticleMetaCategory } from './article-meta-category'

export const ArticleMeta = ({
  className,
  date,
  categoryName,
}: {
  date: string
  categoryName: string
  className?: string
}) => (
  <div
    className={
      'flex items-center gap-1 text-primary text-sm' +
      (className ? ' ' + className : '')
    }
  >
    <ArticleMetaDate date={date} />
    <ArticleMetaCategory categoryName={categoryName} />
  </div>
)
