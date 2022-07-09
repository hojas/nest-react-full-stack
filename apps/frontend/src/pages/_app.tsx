import type { AppProps } from 'next/app'
import Head from 'next/head'
import './styles.css'

import { BaseLayout } from '@nx-blog/frontend/layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BaseLayout>
      <Head>
        <title>朝闻道</title>
      </Head>
      <Component {...pageProps} />
    </BaseLayout>
  )
}
