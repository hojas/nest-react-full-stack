import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import {
  DashboardOutlined,
  UserOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
  CommentOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons'
import { useBaseLayout } from './useBaseLayout'

const { Header, Sider, Content, Footer } = Layout

const menuItems: ItemType[] = [
  {
    label: 'Dashboard',
    icon: <DashboardOutlined />,
    key: '/',
  },
  {
    label: '用户管理',
    icon: <UserOutlined />,
    key: '/user',
  },
  {
    label: '分类管理',
    icon: <UnorderedListOutlined />,
    key: '/topic',
  },
  {
    label: '文章管理',
    icon: <FileTextOutlined />,
    key: '/article',
  },
  {
    label: '评论管理',
    icon: <CommentOutlined />,
    key: '/comment',
  },
  {
    label: '角色管理',
    icon: <UserSwitchOutlined />,
    key: '/role',
  },
]

interface LayoutProps {
  children: React.ReactNode
}

export const BaseLayout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const { selectedKeys, onClick } = useBaseLayout()

  return (
    <Layout className="min-h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="py-[4px] m-[16px] text-white text-xl text-center">
          Admin
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={selectedKeys}
          items={menuItems}
          onClick={onClick}
        />
      </Sider>
      <Layout>
        <Header className="p-0 bg-white" />
        <Content className="m-[16px]">
          <div className="p-[24px] bg-white">{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          nest-react-blog ©2023 Created by hojas
        </Footer>
      </Layout>
    </Layout>
  )
}
