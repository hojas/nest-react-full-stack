import CodeMirror from '@uiw/react-codemirror'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'

interface Props {
  className?: string
  content: string
  onChange(content: string): void
}

export const MarkdownEditor = ({ className, content, onChange }: Props) => (
  <CodeMirror
    className={className}
    value={content}
    height="100%"
    theme={dracula}
    extensions={[
      markdown({ base: markdownLanguage, codeLanguages: languages }),
    ]}
    onChange={onChange}
  />
)
