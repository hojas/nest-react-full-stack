import { useState, useEffect } from 'react'
import { Topic } from './topic.service'

type ModalType = 'create' | 'update'

const modalTitleMap = {
  create: '添加分类',
  update: '更新分类',
}

export const useModal = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState<ModalType>('create')
  const [modalTitle, setModalTitle] = useState(modalTitleMap[modalType])
  const [activeTopic, setActiveTopic] = useState<Topic | undefined>()

  useEffect(() => {
    modalType === 'create' && setActiveTopic(undefined)
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
    activeTopic,
    showModal,
    hideModal,
  }
}
