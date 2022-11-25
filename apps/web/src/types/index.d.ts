declare interface Pagination<T> {
  page: number
  pageSize: number
  total: number
  results: T[]
}

declare interface Category {
  id: number
  code: string
  name: string
  orderIndex: number
  createdAt: string
  updatedAt: string
}

declare interface Article {
  id: number
  title: string
  content: string
  categoryId: number
  category: Category
  authorId: number
  tags: string[]
  viewCount: number
  likeCount: number
  collectCount: number
  createdAt: string
  updatedAt: string
}
