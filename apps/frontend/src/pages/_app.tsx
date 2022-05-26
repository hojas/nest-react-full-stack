import type { AppProps } from 'next/app'
import Head from 'next/head'
import './styles.css'

import { BaseLayout } from '@nx-blog/frontend/layout'

// 百度统计
const getAnalyticsTag = () => ({
  __html: `
  var _hmt = _hmt || []
  ;(function () {
    var hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?${process.env.NEXT_PUBLIC_BAIDU_TONGJI_KEY}'
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  })()`,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BaseLayout>
      <Head>
        <title>朝闻道</title>
        <script dangerouslySetInnerHTML={getAnalyticsTag()} />
      </Head>
      <Component {...pageProps} />
    </BaseLayout>
  )
}
