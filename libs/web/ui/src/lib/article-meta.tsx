import { format } from 'date-fns'
import { BiTimeFive, BiPurchaseTagAlt } from 'react-icons/bi'

const formattedDate = (date: string) => format(new Date(date), 'yyyy年MM月dd日')

const ArticleMetaDate = ({ date }: { date: string }) => (
  <div className="flex items-center mr-4">
    <BiTimeFive className="mr-1" />
    <div>{formattedDate(date)}</div>
  </div>
)

const ArticleMetaCategory = ({ categoryName }: { categoryName: string }) => (
  <div className="flex items-center">
    <BiPurchaseTagAlt className="mr-1" />
    <div>{categoryName}</div>
  </div>
)

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
