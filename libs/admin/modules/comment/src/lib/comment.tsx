import { useState } from 'react'
import { Button, Table, Space, Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { Comment } from './comment.service'
import { useComment } from './useComment'

const columns = (
  setActiveComment: (category: Comment) => void,
  handleDelete: (id: number) => void
) => [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '内容',
    dataIndex: 'content',
  },
  {
    title: '作者',
    render: (_: any, record: Comment) => <div>{record.author.username}</div>,
  },
  {
    title: '文章',
    render: (_: any, record: Comment) => <div>{record.article.title}</div>,
  },
  {
    title: '时间',
    dataIndex: 'createdAt',
  },
  {
    title: '操作',
    key: 'action',
    render: (_: any, record: Comment) => (
      <Space size="middle">
        <Popconfirm
          title="确定删除该评论？"
          okText="确定"
          cancelText="取消"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button type="primary" danger>
            <DeleteOutlined />
            删除
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
]

export const AdminComment = () => {
  const [activeComment, setActiveComment] = useState<Comment>()
  const { commentList, getCommentList, removeComment } = useComment()

  return (
    <Table
      columns={columns(setActiveComment, removeComment)}
      dataSource={commentList.results}
      rowKey={(record: Comment) => record.id}
    />
  )
}
