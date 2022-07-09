import { useState, useCallback, useEffect } from 'react'
import { MarkdownEditor } from '@nx-blog/shared/markdown-editor'
import { MarkdownViewer } from '@nx-blog/shared/markdown-viewer'

interface Props {
  content: string
  onChange(content: string): void
}

export const ArticleContent = ({ content, onChange }: Props) => {
  const [str, setStr] = useState(content)

  useEffect(() => {
    setStr(content)
  }, [content])

  const handleChange = useCallback(
    (content: string) => {
      setStr(content)
      onChange(content)
    },
    [onChange]
  )

  return (
    <div className="flex content-between h-[100%]">
      <MarkdownEditor
        className="w-[50%]"
        content={str}
        onChange={handleChange}
      />
      <MarkdownViewer
        className="w-[50%] p-1 border border-solid border-gray-300"
        content={str}
      />
    </div>
  )
}
