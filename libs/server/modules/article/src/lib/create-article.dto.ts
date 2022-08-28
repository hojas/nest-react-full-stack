export class CreateArticleDto {
  title: string
  content: string
  categoryId: number
  authorId: number
  tagIds: number[]
}
