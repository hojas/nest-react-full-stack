// Category Data Transfer Object
export class ArticleDto {
  id?: number;
  title: string;
  content: string;
  categoryId: number;
  authorId: number;
  tags?: string;
  viewCount?: number;
  likeCount?: number;
  collectCount?: number;
}
