export class CreateArticleDto {
  title: string
  content: string
  category_id: number
  author_id: number
  tag_ids: number[]
}
