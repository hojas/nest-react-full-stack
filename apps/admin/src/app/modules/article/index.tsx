import { useState } from 'react'
import { Button, Table, Space, Popconfirm, Drawer } from 'antd'
import type { DrawerProps } from 'antd'
import { format } from 'date-fns'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Category } from '../category/category.service'
import { Article, CreateArticleDto } from './article.service'
import ArticleModal from './article-modal'
import ArticleForm from './article-form'
import { useArticle } from './useArticle'
import { useModal } from './useModal'
import { ArticleContent } from './article-content'
import './style.scss'

type ModalType = 'create' | 'update'

const columns = (
  categoryList: Category[],
  showModal: (type: ModalType) => void,
  setActiveArticle: (article: Article) => void,
  handleDelete: (id: number) => void,
  showDrawer: () => void
) => [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '名称',
    dataIndex: 'title',
  },
  {
    title: '分类',
    render: (_: unknown, record: Article) => (
      <div>{categoryList.find(c => c.id === record.categoryId)?.name}</div>
    ),
  },
  {
    title: '创建时间',
    render: (_: unknown, record: Article) => (
      <div>{format(new Date(record.createdAt), 'yyyy年MM月dd日 HH:mm:ss')}</div>
    ),
  },
  {
    title: '操作',
    render: (_: unknown, record: Article) => (
      <Space size="middle">
        <Button
          type="primary"
          onClick={() => {
            setActiveArticle(record)
            showModal('update')
          }}
        >
          <EditOutlined />
          编辑
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setActiveArticle(record)
            showDrawer()
          }}
        >
          <EditOutlined />
          编辑内容
        </Button>
        <Popconfirm
          title="确定删除该文章？"
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

export const AdminArticle = () => {
  const [activeArticle, setActiveArticle] = useState<Article>()
  const {
    categoryList,
    articleList,
    addArticle,
    updateArticle,
    removeArticle,
  } = useArticle()

  const {
    modalVisible,
    setModalVisible,
    modalType,
    modalTitle,
    showModal,
    hideModal,
  } = useModal()

  const handleShowAddModal = () => {
    setActiveArticle(undefined)
    showModal('create')
  }

  const onFinish = (article: CreateArticleDto) => {
    modalType === 'create'
      ? addArticle(article)
      : activeArticle && updateArticle(activeArticle.id, article)

    setModalVisible(false)
  }

  const [drawerVisible, setDrawerVisible] = useState(false)
  const showDrawer = () => setDrawerVisible(true)
  const handleCloseDrawer = () => setDrawerVisible(false)
  const handleContentChange = (content: string) => {
    activeArticle && setActiveArticle({ ...activeArticle, content })
  }
  const handleSaveArticleContent = () => {
    activeArticle && updateArticle(activeArticle.id, activeArticle)
    handleCloseDrawer()
  }

  const drawerProps = {
    className: 'article-content-drawer',
    title: '编辑文章内容',
    placement: 'right',
    width: '90%',
    visible: drawerVisible,
    onClose: handleCloseDrawer,
    extra: (
      <Space>
        <Button onClick={handleCloseDrawer}>取消</Button>
        <Button onClick={handleSaveArticleContent} type="primary">
          保存
        </Button>
      </Space>
    ),
  } as DrawerProps

  return (
    <>
      <Button className="mb-[10px]" type="primary" onClick={handleShowAddModal}>
        <PlusOutlined />
        添加
      </Button>
      <Table
        columns={columns(
          categoryList,
          showModal,
          setActiveArticle,
          removeArticle,
          showDrawer
        )}
        dataSource={articleList.results}
        rowKey={(record: Article) => record.id}
        pagination={false}
      />
      <ArticleModal
        visible={modalVisible}
        title={modalTitle}
        hideModal={hideModal}
      >
        <ArticleForm
          categoryList={categoryList}
          article={activeArticle}
          onFinish={onFinish}
        />
      </ArticleModal>
      <Drawer {...drawerProps}>
        <ArticleContent
          content={activeArticle?.content || ''}
          onChange={handleContentChange}
        />
      </Drawer>
    </>
  )
}
