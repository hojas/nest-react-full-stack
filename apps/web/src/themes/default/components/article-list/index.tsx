import { ArticleItem } from '../article-item'
import { Divider } from './divider'
import { ArticleListEmpty } from './article-list-empty'

export const ArticleList = ({ articles }: { articles: Article[] }) => (
  <div className="p-10 bg-base-100 rounded-box shadow">
    {articles.length ? (
      articles.map((article, index) => (
        <div key={article.id}>
          <ArticleItem article={article} />
          <Divider index={index} length={articles.length} />
        </div>
      ))
    ) : (
      <ArticleListEmpty />
    )}
  </div>
)
