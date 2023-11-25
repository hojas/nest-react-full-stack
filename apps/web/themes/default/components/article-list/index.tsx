import { ArticleItem } from '../article-item'
import { Divider } from './divider'

export const ArticleList = ({ articles }: { articles: Article[] }) => (
  <div>
    {articles.length ? (
      articles.map((article, index) => (
        <div key={article.id}>
          <ArticleItem article={article} />
          <Divider index={index} length={articles.length} />
        </div>
      ))
    ) : (
      <div>没有相关文章</div>
    )}
  </div>
)
