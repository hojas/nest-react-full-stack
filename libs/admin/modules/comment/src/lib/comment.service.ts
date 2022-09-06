import { $axios } from '@nx-blog/admin/common'
import { Pagination } from '@nx-blog/shared/pagination'

const api = {
  list: '/admin/comment/',
  detail: (id: number) => `/admin/comment/${id}/`,
}

export interface Comment {
  id: number
  content: string
  createdAt: string
  author: {
    id: number
    username: string
  }
  article: {
    id: number
    title: string
  }
}

export class CommentService {
  static getCommentList() {
    return $axios.get<Pagination<Comment>>(api.list)
  }

  static removeComment(id: number) {
    return $axios.delete<Comment>(api.detail(id))
  }
}
