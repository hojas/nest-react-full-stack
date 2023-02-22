import { $axios } from '../../utils/axios'
import { Pagination } from '@nest-react-blog/pagination'

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
