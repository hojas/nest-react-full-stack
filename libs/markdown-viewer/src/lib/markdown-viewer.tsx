import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import style from './style.module.scss'

interface Props {
  className?: string
  content: string
}

export const MarkdownViewer = ({ className, content }: Props) => {
  className = className ? ' ' + className : ''

  return (
    <ReactMarkdown
      className={style['markdown-viewer'] + className}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              style={nightOwl as any}
              language={match[1]}
              PreTag="div"
              showLineNumbers={true}
              showInlineLineNumbers={true}
              wrapLongLines={true}
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
      }}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      skipHtml={false}
    >
      {content}
    </ReactMarkdown>
  )
}
