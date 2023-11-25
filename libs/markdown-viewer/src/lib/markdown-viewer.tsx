import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import 'github-markdown-css/github-markdown-light.css'

interface Props {
  className?: string
  content: string
}

export const MarkdownViewer = ({ className, content }: Props) => {
  className = className ? ' ' + className : ''

  return (
    <ReactMarkdown
      className={'markdown-body' + className}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props
          const match = /language-(\w+)/.exec(className || '')
          return match ? (
            <SyntaxHighlighter
              PreTag="div"
              language={match[1]}
              style={nightOwl}
              wrapLongLines={true}
              showLineNumbers={true}
              showInlineLineNumbers={true}
              {...rest}
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
