import { format } from 'date-fns'
import { BiCopyright, BiTimeFive, BiLink } from 'react-icons/bi'

export const ArticleFooter = ({
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
