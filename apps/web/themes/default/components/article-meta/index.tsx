import { ArticleMetaDate } from './article-meta-date'
import { ArticleMetaTopic } from './article-meta-topic'
import { addClassName } from '../../utils/addClassName'

export const ArticleMeta = ({
  className,
  date,
  topicName,
}: {
  date: string
  topicName: string
  className?: string
}) => (
  <div
    className={
      'flex items-center gap-1 text-sm text-neutral-400' +
      addClassName(className)
    }
  >
    <ArticleMetaDate className="mr-2" date={date} />
    <ArticleMetaTopic topicName={topicName} />
  </div>
)
