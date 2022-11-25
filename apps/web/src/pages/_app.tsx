import { AppProps } from 'next/app'
import Head from 'next/head'
import getConfig from 'next/config'
import Script from 'next/script'
import { ToastContainer } from 'react-toastify'
import 'katex/dist/katex.min.css'
import 'react-toastify/dist/ReactToastify.css'

import { BaseLayout } from '../themes'
import './styles.scss'

// 百度统计
const { publicRuntimeConfig } = getConfig()
const getAnalyticsTag = {
  __html: `
  var _hmt = _hmt || []
  ;(function () {
    var hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?${publicRuntimeConfig.baiduKey}'
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  })()`,
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BaseLayout>
      <Head>
        <title>nx-blog</title>
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
      <Script
        id="hmt"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={getAnalyticsTag}
      />
    </BaseLayout>
  )
}
