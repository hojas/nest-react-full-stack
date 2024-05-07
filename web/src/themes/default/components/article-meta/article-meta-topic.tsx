import { BiPurchaseTagAlt } from 'react-icons/bi'

export const ArticleMetaTopic = ({ topicName }: { topicName: string }) => (
  <div className="flex items-center">
    <BiPurchaseTagAlt className="mr-1" />
    <div>{topicName}</div>
  </div>
)
