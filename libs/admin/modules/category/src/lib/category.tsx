import { useState } from 'react'
import { Button, Table, Space, Popconfirm } from 'antd'
import { Category, CreateCategoryDto } from './category.service'
import CategoryModal from './category-modal'
import CategoryForm from './category-form'
import { useCategory } from './useCategory'
import { useModal } from './useModal'

type ModalType = 'create' | 'update'

const columns = (
  showModal: (type: ModalType) => void,
  setActiveCategory: (category: Category) => void,
  handleDelete: (id: number) => void
) => [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'CODE',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '排序码',
    dataIndex: 'orderIndex',
    key: 'orderIndex',
  },
  {
    title: '操作',
    key: 'action',
    render: (_: any, record: Category) => (
      <Space size="middle">
        <Button
          type="primary"
          onClick={() => {
            setActiveCategory(record)
            showModal('update')
          }}
        >
          编辑
        </Button>
        <Popconfirm
          title="确定删除该分类？"
          okText="确定"
          cancelText="取消"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button type="primary" danger>
            删除
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
]

export const AdminCategory = () => {
  const [activeCategory, setActiveCategory] = useState<Category | undefined>()

  const { categoryList, addCategory, updateCategory, removeCategory } =
    useCategory()

  const {
    modalVisible,
    setModalVisible,
    modalType,
    modalTitle,
    showModal,
    hideModal,
  } = useModal()

  const onFinish = (category: CreateCategoryDto) => {
    modalType === 'create'
      ? addCategory(category)
      : activeCategory && updateCategory(activeCategory.id, category)

    setModalVisible(false)
  }

  return (
    <>
      <Button
        className="mb-[10px]"
        type="primary"
        onClick={() => showModal('create')}
      >
        添加
      </Button>
      <Table
        columns={columns(showModal, setActiveCategory, removeCategory)}
        dataSource={categoryList}
        rowKey={(record: Category) => record.code}
        pagination={false}
      />
      <CategoryModal
        visible={modalVisible}
        title={modalTitle}
        hideModal={hideModal}
      >
        <CategoryForm category={activeCategory} onFinish={onFinish} />
      </CategoryModal>
    </>
  )
}
