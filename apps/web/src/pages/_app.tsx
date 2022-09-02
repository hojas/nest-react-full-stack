import { AppProps } from 'next/app'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { BaseLayout } from '@nx-blog/web/layout'
import './styles.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BaseLayout>
      <Head>
        <title>朝闻道</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
      <ToastContainer />
    </BaseLayout>
  )
}
