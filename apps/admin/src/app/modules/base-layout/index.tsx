import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  UserOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
  CommentOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons'
import { useBaseLayout } from './useBaseLayout'

const { Header, Sider, Content } = Layout

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
    key: '/category',
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
    <Layout className="h-full">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="py-[4px] m-[16px] text-white text-xl text-center">
          nest-react-blog
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
        <Header className="flex items-center !p-0 !bg-white">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className:
                'trigger p-[0_24px] text-2xl leading-[64px] cursor-pointer transition-colors duration-300',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content className="m-[24px_16px] p-[24px] bg-white">
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
