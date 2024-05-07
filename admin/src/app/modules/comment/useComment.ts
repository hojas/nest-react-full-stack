import { useEffect, useState } from 'react'
import type { Comment } from './comment.service'
import { CommentService } from './comment.service'
import type { Pagination } from '~/app/components/pagination'

export function useComment() {
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
