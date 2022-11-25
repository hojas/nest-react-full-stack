import removeMarkdown from 'remove-markdown'

export const ArticleContent = ({ content }: { content: string }) => (
  <div className="text-primary-focus line-clamp-2">
    {removeMarkdown(content)}
  </div>
)
