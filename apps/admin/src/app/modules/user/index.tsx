import { useState, useEffect } from 'react'
import { Table } from 'antd'
import { User, UserService } from './user.service'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
]

export const AdminUser = () => {
  const [page, setPage] = useState(1)
  const [dataSource, setDataSource] = useState<User[]>([])

  useEffect(() => {
    UserService.getUserList().then(({ ok, data }) => {
      if (ok) {
        setPage(data.page)
        setDataSource(data.results)
      }
    })
  }, [page])

  return <Table columns={columns} dataSource={dataSource} rowKey="id" />
}
