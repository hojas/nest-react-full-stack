export class CreateArticleDto {
  title: string
  content: string
  topicId: number
  authorId: number
  tagIds: number[]
}
