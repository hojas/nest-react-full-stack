import { Article } from '@nx-blog/frontend/services/article'
import { ArticleItem } from './article-item'

export const ArticleList = ({ articles }: { articles: Article[] }) => (
  <>
    {articles.map(article => (
      <ArticleItem article={article} key={article.id} />
    ))}
    <div className="btn-group justify-center">
      <button className="btn">1</button>
      <button className="btn btn-active">2</button>
      <button className="btn">3</button>
      <button className="btn">4</button>
    </div>
  </>
)
