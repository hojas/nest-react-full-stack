import { useState } from 'react'
import { Button, Table, Space, Popconfirm } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Topic, CreateTopicDto } from './topic.service'
import TopicModal from './topic-modal'
import TopicForm from './topic-form'
import { useTopic } from './useTopic'
import { useModal } from './useModal'

type ModalType = 'create' | 'update'

const columns = (
  showModal: (type: ModalType) => void,
  setActiveTopic: (topic: Topic) => void,
  handleDelete: (id: number) => void
) => [
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
  {
    title: '排序码',
    dataIndex: 'orderIndex',
  },
  {
    title: '操作',
    key: 'action',
    render: (_: any, record: Topic) => (
      <Space size="middle">
        <Button
          type="primary"
          onClick={() => {
            setActiveTopic(record)
            showModal('update')
          }}
        >
          <EditOutlined />
          编辑
        </Button>
        <Popconfirm
          title="确定删除该分类？"
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

export const AdminTopic = () => {
  const [activeTopic, setActiveTopic] = useState<Topic>()
  const { topicList, addTopic, updateTopic, removeTopic } =
    useTopic()

  const {
    modalVisible,
    setModalVisible,
    modalType,
    modalTitle,
    showModal,
    hideModal,
  } = useModal()

  const onShowAddModal = () => {
    setActiveTopic(undefined)
    showModal('create')
  }

  const onFinish = (topic: CreateTopicDto) => {
    modalType === 'create'
      ? addTopic(topic)
      : activeTopic && updateTopic(activeTopic.id, topic)

    setModalVisible(false)
  }

  return (
    <>
      <Button className="mb-[10px]" type="primary" onClick={onShowAddModal}>
        <PlusOutlined />
        添加
      </Button>
      <Table
        columns={columns(showModal, setActiveTopic, removeTopic)}
        dataSource={topicList}
        rowKey={(record: Topic) => record.id}
        pagination={false}
      />
      <TopicModal
        visible={modalVisible}
        title={modalTitle}
        hideModal={hideModal}
      >
        <TopicForm topic={activeTopic} onFinish={onFinish} />
      </TopicModal>
    </>
  )
}
