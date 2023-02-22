import { useState, useEffect } from 'react'
import { Pagination } from '@nest-react-blog/pagination'
import { Comment, CommentService } from './comment.service'

export const useComment = () => {
  const [commentList, setCommentList] = useState<Pagination<Comment>>({
    page: 1,
    pageSize: 20,
    total: 0,
    results: [],
  })

  const getCommentList = async () => {
    const { ok, data } = await CommentService.getCommentList()
    ok && setCommentList(data)
  }

  useEffect(() => {
    getCommentList()
  }, [])

  const removeComment = async (id: number) => {
    await CommentService.removeComment(id)
    getCommentList()
  }

  return {
    commentList,
    getCommentList,
    removeComment,
  }
}
