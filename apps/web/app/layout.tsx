import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import 'katex/dist/katex.min.css'
import 'react-toastify/dist/ReactToastify.css'

import { BaseLayout } from '../themes'
import './global.css'

export const metadata = {
  title: '朝闻道',
  description: '朝闻道',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hans">
      <body>
        <BaseLayout>{children}</BaseLayout>
        <ToastContainer />
      </body>
    </html>
  )
}
