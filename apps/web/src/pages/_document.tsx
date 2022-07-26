import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

// 百度统计
const getAnalyticsTag = {
  __html: `
  var _hmt = _hmt || []
  ;(function () {
    var hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?${process.env.NEXT_PUBLIC_BAIDU_TONGJI_KEY}'
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  })()`,
}

export default function Document() {
  return (
    <Html>
      <Head>
        <Script
          id="hmt"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={getAnalyticsTag}
        />
      </Head>
      <body className="bg-[#f7f8f9]">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
