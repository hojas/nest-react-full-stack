import { format } from 'date-fns'
import { BiTimeFive } from 'react-icons/bi'
import { addClassName } from '../../utils/addClassName'

const formattedDate = (date: string) => format(new Date(date), 'yyyy年MM月dd日')

export const ArticleMetaDate = ({
  date,
  className,
}: {
  date: string
  className?: string
}) => (
  <div className={'flex items-center' + addClassName(className)}>
    <BiTimeFive className="mr-1" />
    <div>{formattedDate(date)}</div>
  </div>
)
