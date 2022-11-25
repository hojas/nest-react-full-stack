import { BiPurchaseTagAlt } from 'react-icons/bi'

export const ArticleMetaCategory = ({
  categoryName,
}: {
  categoryName: string
}) => (
  <div className="flex items-center">
    <BiPurchaseTagAlt className="mr-1" />
    <div>{categoryName}</div>
  </div>
)
