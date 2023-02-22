import { AppProps } from 'next/app'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import 'katex/dist/katex.min.css'
import 'react-toastify/dist/ReactToastify.css'

import { BaseLayout } from '../themes'
import './styles.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BaseLayout>
      <Head>
        <title>nest-react-blog</title>
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </BaseLayout>
  )
}
