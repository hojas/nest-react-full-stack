import Giscus from '@giscus/react'

export const Comment = () => {
  return (
    <Giscus
      id="comments"
      repo="hojas/nest-react-blog-comments"
      repoId="R_kgDOIDqpxA"
      category="Announcements"
      categoryId="DIC_kwDOIDqpxM4CRmuL"
      mapping="pathname"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="zh-CN"
      loading="lazy"
    />
  )
}
