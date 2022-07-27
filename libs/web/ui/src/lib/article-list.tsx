import { Article } from '@nx-blog/web/services/article'
import { ArticleItem } from './article-item'

const Divider = ({ index, length }: { index: number; length: number }) =>
  index !== length - 1 ? <div className="divider" /> : null

const ArticleListEmpty = () => (
  <div className="text-center">
    <h2 className="mb-4 text-primary-content text-2xl font-bold">没有文章</h2>
    <p className="text-primary">暂时没有文章，请稍后再来~</p>
  </div>
)

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
