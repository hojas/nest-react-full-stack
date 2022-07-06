import { useState, useEffect } from 'react'
import { Article } from './article.service'

type ModalType = 'create' | 'update'

const modalTitleMap = {
  create: '添加文章',
  update: '更新文章',
}

export const useModal = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState<ModalType>('create')
  const [modalTitle, setModalTitle] = useState(modalTitleMap[modalType])
  const [activeArticle, setActiveArticle] = useState<Article>()

  useEffect(() => {
    modalType === 'create' && setActiveArticle(undefined)
    setModalTitle(modalTitleMap[modalType])
  }, [modalType])

  const showModal = (type: ModalType) => {
    setModalType(type)
    setModalVisible(true)
  }

  const hideModal = () => {
    setModalVisible(false)
  }

  return {
    modalVisible,
    setModalVisible,
    modalType,
    modalTitle,
    activeArticle,
    showModal,
    hideModal,
  }
}
