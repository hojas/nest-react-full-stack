import removeMarkdown from 'remove-markdown'

function getSlicedContent(content: string) {
  const c = content.slice(0, 200)
  const c2 = c.length < content.length ? c + '...' : c
  return removeMarkdown(c2)
}

export const ArticleContent = ({ content }: { content: string }) => (
  <div className="mt-3 text-sm text-neutral-600">
    {getSlicedContent(content)}
  </div>
)
