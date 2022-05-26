import Link from 'next/link'

interface Article {
  id: number
  title: string
}

interface ArticleList {
  articles: Article[]
}

export const ArticleList = ({ articles }: ArticleList) => (
  <div>
    {articles.map(article => (
      <div key={article.id}>
        <Link href={`/article/${article.id}`}>
          <a className="inline-block py-[10px] text-[16px]">{article.title}</a>
        </Link>
      </div>
    ))}
  </div>
)
