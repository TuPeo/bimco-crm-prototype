'use client';

import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Badge, Button } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  CarOutlined,
  BookOutlined,
  SearchOutlined,
  SettingOutlined,
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: <Link href="/">Dashboard</Link>,
    },
    {
      key: '/companies',
      icon: <TeamOutlined />,
      label: <Link href="/companies">Companies</Link>,
    },
    {
      key: '/contacts',
      icon: <UserOutlined />,
      label: <Link href="/contacts">Contacts</Link>,
    },
    {
      key: '/fleets',
      icon: <CarOutlined />,
      label: <Link href="/fleets">Fleets</Link>,
    },
    {
      key: '/courses',
      icon: <BookOutlined />,
      label: <Link href="/courses">Courses & Events</Link>,
    },
    {
      key: '/search',
      icon: <SearchOutlined />,
      label: <Link href="/search">Search</Link>,
    },
    {
      key: '/segments',
      icon: <SettingOutlined />,
      label: <Link href="/segments">Segments</Link>,
    },
    {
      key: '/notifications',
      icon: <BellOutlined />,
      label: <Link href="/notifications">Notifications</Link>,
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <UserOutlined />,
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <SettingOutlined />,
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        background: '#003f7f',
        padding: '0 24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ color: 'white', marginRight: 16 }}
          />
          <div className="bimco-logo">
            BIMCO CRM
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Badge count={3}>
            <BellOutlined style={{ color: 'white', fontSize: 18 }} />
          </Badge>
          
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Avatar size="small" icon={<UserOutlined />} style={{ marginRight: 8 }} />
              <span style={{ color: 'white' }}>Admin User</span>
            </div>
          </Dropdown>
        </div>
      </Header>

      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ background: '#fff' }}
          width={256}
        >
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            items={menuItems}
            style={{ height: '100%', borderRight: 0 }}
          />
        </Sider>

        <Content style={{ 
          margin: '24px 24px 24px 24px',
          background: '#fff',
          minHeight: 280,
          borderRadius: 8,
          padding: 24
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
