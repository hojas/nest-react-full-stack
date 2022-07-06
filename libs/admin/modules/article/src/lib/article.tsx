import { useState } from 'react'
import { Button, Table, Space, Popconfirm } from 'antd'
import { format } from 'date-fns'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Category } from '@nx-blog/admin/modules/category'
import { Article, CreateArticleDto } from './article.service'
import ArticleModal from './article-modal'
import ArticleForm from './article-form'
import { useArticle } from './useArticle'
import { useModal } from './useModal'

type ModalType = 'create' | 'update'

const columns = (
  categoryList: Category[],
  showModal: (type: ModalType) => void,
  setActiveArticle: (article: Article) => void,
  handleDelete: (id: number) => void
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
    render: (_: any, record: Article) => (
      <div>{categoryList.find(c => c.id === record.categoryId)?.name}</div>
    ),
  },
  {
    title: '创建时间',
    render: (_: any, record: Article) => (
      <div>{format(new Date(record.createdAt), 'yyyy年MM月dd日 HH:mm:ss')}</div>
    ),
  },
  {
    title: '操作',
    render: (_: any, record: Article) => (
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

  const onFinish = (article: CreateArticleDto) => {
    modalType === 'create'
      ? addArticle(article)
      : activeArticle && updateArticle(activeArticle.id, article)

    setModalVisible(false)
  }

  return (
    <>
      <Button
        className="mb-[10px]"
        type="primary"
        onClick={() => showModal('create')}
      >
        <PlusOutlined />
        添加
      </Button>
      <Table
        columns={columns(
          categoryList,
          showModal,
          setActiveArticle,
          removeArticle
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
    </>
  )
}
