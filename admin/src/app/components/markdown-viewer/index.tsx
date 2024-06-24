import React from 'react'
import type { ExtraProps } from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import 'github-markdown-css/github-markdown-light.css'

interface Props {
  className?: string
  content: string
}

export function MarkdownViewer({ className, content }: Props) {
  className = className ? ` ${className}` : ''

  return (
    <ReactMarkdown
      className={`markdown-body${className}`}
      components={{
        code(
          props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ExtraProps,
        ) {
          const { children, className } = props
          const match = /language-(\w+)/.exec(className || '')
          return match
            ? (
              <SyntaxHighlighter
                PreTag="div"
                language={match[1]}
                style={nightOwl}
                wrapLongLines
                showLineNumbers
                showInlineLineNumbers
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
              )
            : (
              <code className={className} {...props}>
                {children}
              </code>
              )
        },
      }}
      remarkPlugins={[remarkGfm]}
      skipHtml={false}
    >
      {content}
    </ReactMarkdown>
  )
}
