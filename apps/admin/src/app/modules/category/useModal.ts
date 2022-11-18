import { useState, useEffect } from 'react'
import { Category } from './category.service'

type ModalType = 'create' | 'update'

const modalTitleMap = {
  create: '添加分类',
  update: '更新分类',
}

export const useModal = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState<ModalType>('create')
  const [modalTitle, setModalTitle] = useState(modalTitleMap[modalType])
  const [activeCategory, setActiveCategory] = useState<Category | undefined>()

  useEffect(() => {
    modalType === 'create' && setActiveCategory(undefined)
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
    activeCategory,
    showModal,
    hideModal,
  }
}
