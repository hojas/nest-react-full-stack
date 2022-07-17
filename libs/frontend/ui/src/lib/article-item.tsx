import { format } from 'date-fns'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { Article } from '@nx-blog/frontend/services/article'

const formattedDate = (date: string) => format(new Date(date), 'yyyy年MM月dd日')

export const ArticleItem = ({ article }: { article: Article }) => (
  <Link href={`/article/${article.id}`}>
    <a className="flex justify-between mb-8 p-4 border-b border-neutral cursor-pointer">
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-primary text-2xl font-bold">{article.title}</h2>
          <div className="text-neutral-content">{article.content}</div>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <FontAwesomeIcon icon={faClock} />
          <div>{formattedDate(article.createdAt)}</div>
        </div>
      </div>
      <div className="">
        <img src="https://placeimg.com/100/100/any" alt="" />
      </div>
    </a>
  </Link>
)
