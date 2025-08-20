'use client';

import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Tag, 
  Space, 
  Modal, 
  Typography,
  Row,
  Col,
  Statistic,
  List,
  Badge,
  Tabs,
  Select,
  Input
} from 'antd';
import { 
  BellOutlined,
  MailOutlined,
  SendOutlined,
  CheckOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  SyncOutlined
} from '@ant-design/icons';
import MainLayout from '@/components/Layout/MainLayout';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Search } = Input;

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'system' | 'event' | 'course' | 'marketing' | 'dotdigital';
  read: boolean;
  dateCreated: string;
  actionUrl?: string;
  recipient?: string;
}

interface Campaign {
  id: string;
  name: string;
  source: 'dotdigital' | 'internal';
  status: 'draft' | 'scheduled' | 'sent' | 'completed';
  recipients: number;
  sentDate?: string;
  subject: string;
  area: 'MyAccount' | 'SmartCon' | 'Business Central' | 'CRM';
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Course Registration Confirmation',
      message: 'Your registration for Maritime Law and Regulations course has been confirmed.',
      type: 'success',
      category: 'course',
      read: false,
      dateCreated: '2024-12-02T10:30:00',
      recipient: 'lars.nielsen@maersk.com'
    },
    {
      id: '2',
      title: 'System Maintenance Scheduled',
      message: 'System maintenance is scheduled for December 15, 2024 from 2:00 AM to 4:00 AM UTC.',
      type: 'warning',
      category: 'system',
      read: false,
      dateCreated: '2024-12-01T14:15:00'
    },
    {
      id: '3',
      title: 'New Company Registration',
      message: 'New company "Test Shipping Ltd." has been registered in the system.',
      type: 'info',
      category: 'system',
      read: true,
      dateCreated: '2024-11-30T09:45:00'
    },
    {
      id: '4',
      title: 'Invoice Ready for Processing',
      message: 'Invoice #INV-2024-001234 is ready for processing.',
      type: 'info',
      category: 'system',
      read: true,
      dateCreated: '2024-11-29T16:20:00'
    }
  ]);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Q4 2024 Course Announcements',
      source: 'dotdigital',
      status: 'completed',
      recipients: 1245,
      sentDate: '2024-11-15',
      subject: 'New Maritime Training Courses Available',
      area: 'MyAccount'
    },
    {
      id: '2',
      name: 'SmartCon Registration Reminder',
      source: 'dotdigital',
      status: 'sent',
      recipients: 892,
      sentDate: '2024-12-01',
      subject: 'Don\'t Miss SmartCon 2025 - Register Now!',
      area: 'SmartCon'
    },
    {
      id: '3',
      name: 'Member Newsletter December',
      source: 'internal',
      status: 'scheduled',
      recipients: 2156,
      subject: 'BIMCO Monthly Update - December 2024',
      area: 'CRM'
    },
    {
      id: '4',
      name: 'Payment Confirmation Emails',
      source: 'internal',
      status: 'draft',
      recipients: 0,
      subject: 'Payment Received - Course Registration',
      area: 'Business Central'
    }
  ]);

  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
  const [isCampaignModalVisible, setIsCampaignModalVisible] = useState(false);

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  const showNotificationDetail = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsNotificationModalVisible(true);
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const showCampaignDetail = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsCampaignModalVisible(true);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckOutlined />;
      case 'warning': return <BellOutlined />;
      case 'error': return <DeleteOutlined />;
      default: return <BellOutlined />;
    }
  };

  const getTagColor = (type: string) => {
    switch (type) {
      case 'success': return 'green';
      case 'warning': return 'orange';
      case 'error': return 'red';
      default: return 'blue';
    }
  };

  const getCampaignStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'sent': return 'blue';
      case 'scheduled': return 'orange';
      case 'draft': return 'default';
      default: return 'default';
    }
  };

  const notificationColumns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 80,
      render: (type: string) => (
        <Tag color={getTagColor(type)}>{type}</Tag>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Notification) => (
        <div>
          <Button 
            type="link" 
            onClick={() => showNotificationDetail(record)}
            style={{ padding: 0, height: 'auto', fontWeight: record.read ? 'normal' : 'bold' }}
          >
            {text}
          </Button>
          {!record.read && <Badge dot style={{ marginLeft: 8 }} />}
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (category: string) => (
        <Tag>{category}</Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'dateCreated',
      key: 'date',
      width: 150,
      render: (date: string) => new Date(date).toLocaleString(),
      sorter: (a: Notification, b: Notification) => 
        new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_: any, record: Notification) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => showNotificationDetail(record)}
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            onClick={() => deleteNotification(record.id)}
            danger
          />
        </Space>
      ),
    },
  ];

  const campaignColumns = [
    {
      title: 'Campaign Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Campaign) => (
        <Button type="link" onClick={() => showCampaignDetail(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      width: 100,
      render: (source: string) => (
        <Tag color={source === 'dotdigital' ? 'blue' : 'green'}>
          {source}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={getCampaignStatusColor(status)}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
      width: 120,
    },
    {
      title: 'Recipients',
      dataIndex: 'recipients',
      key: 'recipients',
      width: 100,
      render: (count: number) => count.toLocaleString(),
    },
    {
      title: 'Sent Date',
      dataIndex: 'sentDate',
      key: 'sentDate',
      width: 120,
      render: (date: string) => date || 'Not sent',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_: any, record: Campaign) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => showCampaignDetail(record)}
          />
        </Space>
      ),
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <MainLayout>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0, color: 'var(--bimco-blue)' }}>
            Notification Management
          </Title>
          <Space>
            <Button icon={<SyncOutlined />}>Sync with Dotdigital</Button>
            <Button 
              type="primary" 
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark All Read ({unreadCount})
            </Button>
          </Space>
        </div>

        {/* Summary Stats */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Notifications"
                value={notifications.length}
                prefix={<BellOutlined style={{ color: 'var(--bimco-blue)' }} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Unread Notifications"
                value={unreadCount}
                prefix={<Badge dot />}
                valueStyle={{ color: unreadCount > 0 ? '#ff4d4f' : '#52c41a' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Campaigns"
                value={campaigns.length}
                prefix={<MailOutlined style={{ color: 'var(--bimco-blue)' }} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Active Campaigns"
                value={campaigns.filter(c => c.status === 'sent' || c.status === 'scheduled').length}
                prefix={<SendOutlined style={{ color: 'var(--bimco-blue)' }} />}
              />
            </Card>
          </Col>
        </Row>

        <Tabs defaultActiveKey="notifications">
          <Tabs.TabPane tab={`Notifications (${notifications.length})`} key="notifications">
            <Card>
              <div style={{ marginBottom: 16 }}>
                <Row gutter={16}>
                  <Col span={8}>
                    <Search placeholder="Search notifications..." />
                  </Col>
                  <Col span={4}>
                    <Select placeholder="Type" style={{ width: '100%' }} allowClear>
                      <Option value="info">Info</Option>
                      <Option value="success">Success</Option>
                      <Option value="warning">Warning</Option>
                      <Option value="error">Error</Option>
                    </Select>
                  </Col>
                  <Col span={4}>
                    <Select placeholder="Category" style={{ width: '100%' }} allowClear>
                      <Option value="system">System</Option>
                      <Option value="event">Event</Option>
                      <Option value="course">Course</Option>
                      <Option value="marketing">Marketing</Option>
                    </Select>
                  </Col>
                </Row>
              </div>

              <Table
                dataSource={notifications}
                columns={notificationColumns}
                rowKey="id"
                rowClassName={(record) => record.read ? '' : 'ant-table-row-selected'}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} notifications`,
                }}
              />
            </Card>
          </Tabs.TabPane>

          <Tabs.TabPane tab={`Campaigns (${campaigns.length})`} key="campaigns">
            <Card>
              <div style={{ marginBottom: 16 }}>
                <Row gutter={16}>
                  <Col span={8}>
                    <Search placeholder="Search campaigns..." />
                  </Col>
                  <Col span={4}>
                    <Select placeholder="Source" style={{ width: '100%' }} allowClear>
                      <Option value="dotdigital">Dotdigital</Option>
                      <Option value="internal">Internal</Option>
                    </Select>
                  </Col>
                  <Col span={4}>
                    <Select placeholder="Status" style={{ width: '100%' }} allowClear>
                      <Option value="draft">Draft</Option>
                      <Option value="scheduled">Scheduled</Option>
                      <Option value="sent">Sent</Option>
                      <Option value="completed">Completed</Option>
                    </Select>
                  </Col>
                </Row>
              </div>

              <Table
                dataSource={campaigns}
                columns={campaignColumns}
                rowKey="id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} campaigns`,
                }}
              />
            </Card>
          </Tabs.TabPane>
        </Tabs>

        {/* Notification Detail Modal */}
        <Modal
          title="Notification Details"
          open={isNotificationModalVisible}
          onCancel={() => setIsNotificationModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setIsNotificationModalVisible(false)}>
              Close
            </Button>
          ]}
          width={600}
        >
          {selectedNotification && (
            <div>
              <div style={{ marginBottom: 16 }}>
                <Tag color={getTagColor(selectedNotification.type)} icon={getNotificationIcon(selectedNotification.type)}>
                  {selectedNotification.type}
                </Tag>
                <Tag>{selectedNotification.category}</Tag>
              </div>
              
              <Title level={4}>{selectedNotification.title}</Title>
              
              <Paragraph>{selectedNotification.message}</Paragraph>
              
              <div style={{ marginTop: 16, fontSize: '12px', color: '#666' }}>
                <div>Created: {new Date(selectedNotification.dateCreated).toLocaleString()}</div>
                {selectedNotification.recipient && (
                  <div>Recipient: {selectedNotification.recipient}</div>
                )}
                <div>Status: {selectedNotification.read ? 'Read' : 'Unread'}</div>
              </div>
            </div>
          )}
        </Modal>

        {/* Campaign Detail Modal */}
        <Modal
          title="Campaign Details"
          open={isCampaignModalVisible}
          onCancel={() => setIsCampaignModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setIsCampaignModalVisible(false)}>
              Close
            </Button>
          ]}
          width={700}
        >
          {selectedCampaign && (
            <div>
              <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col span={12}>
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>Campaign Name:</Text>
                    <div>{selectedCampaign.name}</div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>Subject:</Text>
                    <div>{selectedCampaign.subject}</div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>Source:</Text>
                    <div>
                      <Tag color={selectedCampaign.source === 'dotdigital' ? 'blue' : 'green'}>
                        {selectedCampaign.source}
                      </Tag>
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>Status:</Text>
                    <div>
                      <Tag color={getCampaignStatusColor(selectedCampaign.status)}>
                        {selectedCampaign.status}
                      </Tag>
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>Area:</Text>
                    <div>{selectedCampaign.area}</div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>Recipients:</Text>
                    <div>{selectedCampaign.recipients.toLocaleString()}</div>
                  </div>
                  {selectedCampaign.sentDate && (
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Sent Date:</Text>
                      <div>{selectedCampaign.sentDate}</div>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          )}
        </Modal>
      </div>
    </MainLayout>
  );
};

export default NotificationsPage;
