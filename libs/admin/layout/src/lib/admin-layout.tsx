import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'

const { Header, Sider, Content } = Layout

interface LayoutProps {
  children: React.ReactNode
}

export const BaseLayout = ({ children }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="h-[32px] m-[16px] bg-[rgba(255,_255,_255,_0.3)]" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
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
