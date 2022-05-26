import 'katex/dist/katex.min.css'

import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// @ts-ignore
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'

export const MarkdownViewer = ({ content }: { content: string }) => (
  <ReactMarkdown
    components={{
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <SyntaxHighlighter
            style={oneLight}
            language={match[1]}
            PreTag="div"
            showLineNumbers={true}
            showInlineLineNumbers={true}
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
  >
    {content}
  </ReactMarkdown>
)
