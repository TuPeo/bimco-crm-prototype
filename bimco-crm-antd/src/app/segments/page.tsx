'use client';

import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Tag, 
  Space, 
  Modal, 
  Form, 
  Input, 
  Select,
  Typography,
  Row,
  Col,
  Statistic,
  List
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  CalendarOutlined,
  MailOutlined,
  StopOutlined,
  FileExcelOutlined,
  EyeOutlined
} from '@ant-design/icons';
import MainLayout from '@/components/Layout/MainLayout';

const { Title, Text } = Typography;
const { Option } = Select;

interface Segment {
  id: string;
  name: string;
  description: string;
  criteria: string;
  contactCount: number;
  companyCount: number;
  status: 'Active' | 'Inactive';
  lastUpdated: string;
  createdBy: string;
}

const SegmentsPage: React.FC = () => {
  const [segments, setSegments] = useState<Segment[]>([
    {
      id: '1',
      name: 'Active Shipping Companies',
      description: 'All companies with active member status in shipping industry',
      criteria: 'Company Status = Active AND Company Type = Shipping',
      contactCount: 156,
      companyCount: 45,
      status: 'Active',
      lastUpdated: '2024-12-01',
      createdBy: 'Admin User'
    },
    {
      id: '2',
      name: 'Course Participants Q4 2024',
      description: 'Contacts who participated in courses during Q4 2024',
      criteria: 'Course Registration Date >= 2024-10-01 AND <= 2024-12-31',
      contactCount: 89,
      companyCount: 23,
      status: 'Active',
      lastUpdated: '2024-11-28',
      createdBy: 'Marketing Team'
    },
    {
      id: '3',
      name: 'Prospect Companies - Asia Pacific',
      description: 'Prospect companies in Asia Pacific region',
      criteria: 'Company Status = Prospect AND Country IN (China, Singapore, Japan, South Korea)',
      contactCount: 67,
      companyCount: 18,
      status: 'Active',
      lastUpdated: '2024-11-25',
      createdBy: 'Sales Team'
    }
  ]);

  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setSelectedSegment(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showDetailModal = (segment: Segment) => {
    setSelectedSegment(segment);
    setIsDetailModalVisible(true);
  };

  const handleEdit = (segment: Segment) => {
    setSelectedSegment(segment);
    form.setFieldsValue(segment);
    setIsModalVisible(true);
  };

  const handleDelete = (segmentId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this segment?',
      content: 'This action cannot be undone.',
      onOk: () => {
        setSegments(segments.filter(s => s.id !== segmentId));
      },
    });
  };

  const handleSubmit = (values: any) => {
    if (selectedSegment) {
      // Update existing segment
      setSegments(segments.map(s => 
        s.id === selectedSegment.id 
          ? { ...selectedSegment, ...values, lastUpdated: new Date().toISOString().split('T')[0] }
          : s
      ));
    } else {
      // Create new segment
      const newSegment: Segment = {
        id: Date.now().toString(),
        ...values,
        contactCount: 0,
        companyCount: 0,
        lastUpdated: new Date().toISOString().split('T')[0],
        createdBy: 'Current User'
      };
      setSegments([...segments, newSegment]);
    }
    setIsModalVisible(false);
  };

  const createEvent = (segment: Segment) => {
    console.log('Creating event for segment:', segment);
    // In real app, this would navigate to event creation with pre-filled participants
  };

  const createInteraction = (segment: Segment) => {
    console.log('Creating interaction for segment:', segment);
    // In real app, this would create a bulk interaction for all contacts in segment
  };

  const removeOnHold = (segment: Segment) => {
    console.log('Removing on hold status for segment:', segment);
    // In real app, this would bulk update contact statuses
  };

  const setReadyForInvoice = (segment: Segment) => {
    console.log('Setting ready for invoice for segment:', segment);
    // In real app, this would mark contacts as ready for invoicing
  };

  const columns = [
    {
      title: 'Segment Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Segment) => (
        <Button type="link" onClick={() => showDetailModal(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Contacts',
      dataIndex: 'contactCount',
      key: 'contactCount',
      sorter: (a: Segment, b: Segment) => a.contactCount - b.contactCount,
      render: (count: number) => count.toLocaleString(),
    },
    {
      title: 'Companies',
      dataIndex: 'companyCount',
      key: 'companyCount',
      sorter: (a: Segment, b: Segment) => a.companyCount - b.companyCount,
      render: (count: number) => count.toLocaleString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      sorter: (a: Segment, b: Segment) => new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime(),
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Segment) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => showDetailModal(record)}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            danger
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0, color: 'var(--bimco-blue)' }}>Segment Management</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            Create Segment
          </Button>
        </div>

        {/* Summary Stats */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={8}>
            <Card>
              <Statistic
                title="Total Segments"
                value={segments.length}
                prefix={<FileExcelOutlined style={{ color: 'var(--bimco-blue)' }} />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Total Contacts in Segments"
                value={segments.reduce((total, segment) => total + segment.contactCount, 0)}
                prefix={<MailOutlined style={{ color: 'var(--bimco-blue)' }} />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Active Segments"
                value={segments.filter(s => s.status === 'Active').length}
                prefix={<CalendarOutlined style={{ color: 'var(--bimco-blue)' }} />}
              />
            </Card>
          </Col>
        </Row>

        <Card>
          <Table
            dataSource={segments}
            columns={columns}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} segments`,
            }}
          />
        </Card>

        {/* Create/Edit Modal */}
        <Modal
          title={selectedSegment ? 'Edit Segment' : 'Create New Segment'}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={700}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="name"
              label="Segment Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item
              name="criteria"
              label="Criteria"
              rules={[{ required: true }]}
              help="Define the criteria for this segment (e.g., Company Status = Active AND Country = Denmark)"
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {selectedSegment ? 'Update' : 'Create'}
                </Button>
                <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Segment Detail Modal */}
        <Modal
          title="Segment Details"
          open={isDetailModalVisible}
          onCancel={() => setIsDetailModalVisible(false)}
          footer={[
            <Button key="edit" type="primary" onClick={() => {
              setIsDetailModalVisible(false);
              handleEdit(selectedSegment!);
            }}>
              Edit
            </Button>,
            <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
              Close
            </Button>
          ]}
          width={900}
        >
          {selectedSegment && (
            <div>
              <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="Contacts"
                      value={selectedSegment.contactCount}
                      suffix="contacts"
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="Companies"
                      value={selectedSegment.companyCount}
                      suffix="companies"
                    />
                  </Card>
                </Col>
              </Row>

              <Card title="Segment Information" style={{ marginBottom: 16 }}>
                <div style={{ marginBottom: 16 }}>
                  <Text strong>Name:</Text>
                  <div>{selectedSegment.name}</div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <Text strong>Description:</Text>
                  <div>{selectedSegment.description}</div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <Text strong>Criteria:</Text>
                  <div style={{ fontFamily: 'monospace', background: '#f5f5f5', padding: 8, borderRadius: 4 }}>
                    {selectedSegment.criteria}
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <Text strong>Status:</Text>
                  <div>
                    <Tag color={selectedSegment.status === 'Active' ? 'green' : 'red'}>
                      {selectedSegment.status}
                    </Tag>
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <Text strong>Last Updated:</Text>
                  <div>{selectedSegment.lastUpdated}</div>
                </div>
                <div>
                  <Text strong>Created By:</Text>
                  <div>{selectedSegment.createdBy}</div>
                </div>
              </Card>

              <Card title="Segment Actions">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button 
                    type="primary" 
                    icon={<CalendarOutlined />} 
                    block
                    onClick={() => createEvent(selectedSegment)}
                  >
                    Create Event
                  </Button>
                  <Button 
                    icon={<MailOutlined />} 
                    block
                    onClick={() => createInteraction(selectedSegment)}
                  >
                    Create Interaction
                  </Button>
                  <Button 
                    icon={<StopOutlined />} 
                    block
                    onClick={() => removeOnHold(selectedSegment)}
                  >
                    Remove on Hold
                  </Button>
                  <Button 
                    icon={<FileExcelOutlined />} 
                    block
                    onClick={() => setReadyForInvoice(selectedSegment)}
                  >
                    Set Ready for Invoice
                  </Button>
                </Space>
              </Card>
            </div>
          )}
        </Modal>
      </div>
    </MainLayout>
  );
};

export default SegmentsPage;
