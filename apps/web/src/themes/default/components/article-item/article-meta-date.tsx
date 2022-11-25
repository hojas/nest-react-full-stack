import { format } from 'date-fns'
import { BiTimeFive } from 'react-icons/bi'

const formattedDate = (date: string) => format(new Date(date), 'yyyy年MM月dd日')

export const ArticleMetaDate = ({ date }: { date: string }) => (
  <div className="flex items-center mr-4">
    <BiTimeFive className="mr-1" />
    <div>{formattedDate(date)}</div>
  </div>
)
