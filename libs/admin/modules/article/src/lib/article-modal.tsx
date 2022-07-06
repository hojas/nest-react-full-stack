import React from 'react'
import { Button, Modal } from 'antd'

interface Props {
  children: React.ReactNode
  visible: boolean
  title: string
  hideModal: () => void
}

export default ({ children, visible, title, hideModal }: Props) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={hideModal}
      footer={[
        <Button key="close" onClick={hideModal}>
          取消
        </Button>,
        <Button form="article" type="primary" key="submit" htmlType="submit">
          提交
        </Button>,
      ]}
    >
      {children}
    </Modal>
  )
}
