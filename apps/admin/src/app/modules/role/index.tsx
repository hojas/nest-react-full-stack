import { Table } from 'antd'
import { useRole } from './useRole'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: 'CODE',
    dataIndex: 'code',
  },
]

export const AdminRole = () => {
  const { roleList } = useRole()

  return (
    <Table
      columns={columns}
      dataSource={roleList}
      pagination={false}
      rowKey="id"
    />
  )
}
