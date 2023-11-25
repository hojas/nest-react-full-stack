import { BiLink } from 'react-icons/bi'

export const ArticleFooter = ({
  host,
  path,
}: {
  host: string
  path: string
}) => (
  <div className="mt-4 pt-4 text-sm">
    <div className="flex items-center gap-1">
      <BiLink />
      <div>
        本文地址：
        <a href={host + path}>{host + path}</a>
      </div>
    </div>
  </div>
)
