import { useState, useEffect } from 'react'
import { Button, Table, Space, Popconfirm, message } from 'antd'
import {
  Category,
  CreateCategoryDto,
  CategoryService,
} from './category.service'
import CategoryModal from './category-modal'
import CategoryForm from './category-form'

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
  const [dataSource, setDataSource] = useState<Category[]>([])
  const [categoryModalVisible, setCategoryModalVisible] = useState(false)
  const [modalType, setModalType] = useState<'create' | 'update'>('create')
  const [modalTitle, setModalTitle] = useState('添加分类')
  const [activeCategory, setActiveCategory] = useState<Category | undefined>()

  const getCategoryList = async () => {
    const { ok, data } = await CategoryService.getCategoryList()
    ok && setDataSource(data)
  }

  useEffect(() => {
    getCategoryList()
  }, [])

  useEffect(() => {
    if (modalType === 'create') {
      setActiveCategory(undefined)
      setModalTitle('添加分类')
    } else {
      setModalTitle('编辑分类')
    }
  }, [modalType])

  const showModal = (type: 'create' | 'update') => {
    setModalType(type)
    setCategoryModalVisible(true)
  }

  const hideModal = () => {
    setCategoryModalVisible(false)
  }

  const addCategory = async (category: CreateCategoryDto) => {
    const { ok, message: msg } = await CategoryService.createCategory(category)

    if (ok) {
      getCategoryList()
      setCategoryModalVisible(false)
      message.success('添加分类成功')
    } else {
      message.error(msg)
    }
  }

  const updateCategory = async (id: number, category: CreateCategoryDto) => {
    const { ok, message: msg } = await CategoryService.updateCategory(
      id,
      category
    )

    if (ok) {
      getCategoryList()
      setCategoryModalVisible(false)
      message.success('更新分类成功')
    } else {
      message.error(msg)
    }
  }

  const removeCategory = async (id: number) => {
    await CategoryService.removeCategory(id)
    getCategoryList()
  }

  const onFinish = (category: CreateCategoryDto) => {
    modalType === 'create'
      ? addCategory(category)
      : activeCategory && updateCategory(activeCategory.id, category)
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
        dataSource={dataSource}
        rowKey={(record: Category) => record.code}
        pagination={false}
      />
      <CategoryModal
        visible={categoryModalVisible}
        title={modalTitle}
        hideModal={hideModal}
      >
        <CategoryForm category={activeCategory} onFinish={onFinish} />
      </CategoryModal>
    </>
  )
}
