import { AppProps } from 'next/app'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { BaseLayout } from '@nx-blog/web/layout'
import './styles.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BaseLayout>
      <Head>
        <title>陈远翔前端博客</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
      <ToastContainer />
    </BaseLayout>
  )
}
