'use client';

import React, { useState } from 'react';
import { 
  Table, 
  Card, 
  Button, 
  Input, 
  Select, 
  Space, 
  Tag, 
  Modal, 
  Form, 
  Row, 
  Col,
  Tabs,
  List,
  Typography,
  Progress
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  EyeOutlined,
  ExportOutlined,
  CarOutlined,
  ToolOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import MainLayout from '@/components/Layout/MainLayout';
import { mockFleets } from '@/data/mockData';
import { Fleet } from '@/types';

const { Search } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

const FleetsPage: React.FC = () => {
  const [fleets, setFleets] = useState<Fleet[]>(mockFleets);
  const [filteredFleets, setFilteredFleets] = useState<Fleet[]>(mockFleets);
  const [selectedFleet, setSelectedFleet] = useState<Fleet | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleSearch = (value: string) => {
    const filtered = fleets.filter(fleet =>
      fleet.name.toLowerCase().includes(value.toLowerCase()) ||
      fleet.registrationNumber.toLowerCase().includes(value.toLowerCase()) ||
      fleet.type.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredFleets(filtered);
  };

  const handleStatusFilter = (status: string) => {
    if (!status) {
      setFilteredFleets(fleets);
      return;
    }
    const filtered = fleets.filter(fleet => fleet.operationalStatus === status);
    setFilteredFleets(filtered);
  };

  const handleTypeFilter = (type: string) => {
    if (!type) {
      setFilteredFleets(fleets);
      return;
    }
    const filtered = fleets.filter(fleet => fleet.type === type);
    setFilteredFleets(filtered);
  };

  const showModal = () => {
    setSelectedFleet(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showDetailModal = (fleet: Fleet) => {
    setSelectedFleet(fleet);
    setIsDetailModalVisible(true);
  };

  const handleEdit = (fleet: Fleet) => {
    setSelectedFleet(fleet);
    form.setFieldsValue(fleet);
    setIsModalVisible(true);
  };

  const handleSubmit = (values: any) => {
    console.log('Submitted values:', values);
    setIsModalVisible(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'green';
      case 'maintenance': return 'orange';
      case 'inactive': return 'red';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Fleet Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Fleet) => (
        <Button type="link" onClick={() => showDetailModal(record)}>
          {text}
        </Button>
      ),
      sorter: (a: Fleet, b: Fleet) => a.name.localeCompare(b.name),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Registration',
      dataIndex: 'registrationNumber',
      key: 'registrationNumber',
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
      sorter: (a: Fleet, b: Fleet) => a.capacity - b.capacity,
      render: (capacity: number) => capacity.toLocaleString(),
    },
    {
      title: 'Status',
      dataIndex: 'operationalStatus',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: 'IHS Number',
      key: 'ihsNumber',
      render: (_: any, record: Fleet) => record.ihsInfo?.ihsNumber || 'N/A',
    },
    {
      title: 'Flag',
      key: 'flag',
      render: (_: any, record: Fleet) => record.ihsInfo?.flag || 'N/A',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Fleet) => (
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
        </Space>
      ),
    },
  ];

  const vesselTypes = [...new Set(fleets.map(f => f.type))];
  const statuses = [...new Set(fleets.map(f => f.operationalStatus))];

  return (
    <MainLayout>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0, color: 'var(--bimco-blue)' }}>Fleet Management</Title>
          <Space>
            <Button icon={<ExportOutlined />}>Export</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
              Add Fleet
            </Button>
          </Space>
        </div>

        <Card>
          {/* Filters */}
          <div style={{ marginBottom: 16 }}>
            <Row gutter={16}>
              <Col span={8}>
                <Search
                  placeholder="Search fleets..."
                  onSearch={handleSearch}
                  style={{ width: '100%' }}
                />
              </Col>
              <Col span={4}>
                <Select
                  placeholder="Type"
                  style={{ width: '100%' }}
                  onChange={handleTypeFilter}
                  allowClear
                >
                  {vesselTypes.map(type => (
                    <Option key={type} value={type}>{type}</Option>
                  ))}
                </Select>
              </Col>
              <Col span={4}>
                <Select
                  placeholder="Status"
                  style={{ width: '100%' }}
                  onChange={handleStatusFilter}
                  allowClear
                >
                  {statuses.map(status => (
                    <Option key={status} value={status}>{status}</Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </div>

          {/* Table */}
          <Table
            dataSource={filteredFleets}
            columns={columns}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} fleets`,
            }}
          />
        </Card>

        {/* Add/Edit Modal */}
        <Modal
          title={selectedFleet ? 'Edit Fleet' : 'Add New Fleet'}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={800}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Fleet Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Vessel Type"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="Container Ship">Container Ship</Option>
                    <Option value="Bulk Carrier">Bulk Carrier</Option>
                    <Option value="Tanker">Tanker</Option>
                    <Option value="General Cargo">General Cargo</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="registrationNumber"
                  label="Registration Number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="capacity"
                  label="Capacity (TEU)"
                  rules={[{ required: true }]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="operationalStatus"
                  label="Operational Status"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="Active">Active</Option>
                    <Option value="Maintenance">Maintenance</Option>
                    <Option value="Inactive">Inactive</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {selectedFleet ? 'Update' : 'Create'}
                </Button>
                <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Fleet Detail Modal */}
        <Modal
          title="Fleet Details"
          open={isDetailModalVisible}
          onCancel={() => setIsDetailModalVisible(false)}
          footer={[
            <Button key="edit" type="primary" onClick={() => {
              setIsDetailModalVisible(false);
              handleEdit(selectedFleet!);
            }}>
              Edit
            </Button>,
            <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
              Close
            </Button>
          ]}
          width={1100}
        >
          {selectedFleet && (
            <Tabs defaultActiveKey="general">
              <Tabs.TabPane tab="General Info" key="general">
                <Row gutter={16}>
                  <Col span={12}>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Fleet Name:</Text>
                      <div>{selectedFleet.name}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Type:</Text>
                      <div>{selectedFleet.type}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Registration Number:</Text>
                      <div>{selectedFleet.registrationNumber}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Capacity:</Text>
                      <div>{selectedFleet.capacity.toLocaleString()} TEU</div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Operational Status:</Text>
                      <div>
                        <Tag color={getStatusColor(selectedFleet.operationalStatus)}>
                          {selectedFleet.operationalStatus}
                        </Tag>
                      </div>
                    </div>
                    {selectedFleet.ihsInfo && (
                      <>
                        <div style={{ marginBottom: 16 }}>
                          <Text strong>IHS Number:</Text>
                          <div>{selectedFleet.ihsInfo.ihsNumber}</div>
                        </div>
                        <div style={{ marginBottom: 16 }}>
                          <Text strong>Flag:</Text>
                          <div>{selectedFleet.ihsInfo.flag}</div>
                        </div>
                        <div style={{ marginBottom: 16 }}>
                          <Text strong>Build Year:</Text>
                          <div>{selectedFleet.ihsInfo.buildYear}</div>
                        </div>
                      </>
                    )}
                  </Col>
                </Row>
              </Tabs.TabPane>
              
              <Tabs.TabPane tab="IHS Information" key="ihs">
                {selectedFleet.ihsInfo ? (
                  <Row gutter={16}>
                    <Col span={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Text strong>IHS Number:</Text>
                        <div>{selectedFleet.ihsInfo.ihsNumber}</div>
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        <Text strong>Vessel Type:</Text>
                        <div>{selectedFleet.ihsInfo.vesselType}</div>
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        <Text strong>Flag State:</Text>
                        <div>{selectedFleet.ihsInfo.flag}</div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Text strong>Build Year:</Text>
                        <div>{selectedFleet.ihsInfo.buildYear}</div>
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        <Text strong>Deadweight Tonnage:</Text>
                        <div>{selectedFleet.ihsInfo.dwt.toLocaleString()} DWT</div>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <div>No IHS information available.</div>
                )}
              </Tabs.TabPane>
              
              <Tabs.TabPane tab="Maintenance History" key="maintenance">
                {selectedFleet.maintenanceHistory && selectedFleet.maintenanceHistory.length > 0 ? (
                  <List
                    dataSource={selectedFleet.maintenanceHistory}
                    renderItem={(maintenance) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<ToolOutlined />}
                          title={`${maintenance.type} - ${maintenance.date}`}
                          description={
                            <div>
                              <div>{maintenance.description}</div>
                              {maintenance.cost && (
                                <div style={{ color: '#666', fontSize: '12px' }}>
                                  Cost: ${maintenance.cost.toLocaleString()}
                                </div>
                              )}
                              <Tag color={maintenance.status === 'Completed' ? 'green' : 'orange'}>
                                {maintenance.status}
                              </Tag>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                ) : (
                  <div>No maintenance history available.</div>
                )}
              </Tabs.TabPane>
              
              <Tabs.TabPane tab="Certificates" key="certificates">
                {selectedFleet.certificates && selectedFleet.certificates.length > 0 ? (
                  <List
                    dataSource={selectedFleet.certificates}
                    renderItem={(certificate) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<SafetyCertificateOutlined />}
                          title={certificate.name}
                          description={
                            <div>
                              <div>Issued by: {certificate.issuer}</div>
                              <div>Issue Date: {certificate.issueDate}</div>
                              <div>Expiry Date: {certificate.expiryDate}</div>
                              {new Date(certificate.expiryDate) > new Date() ? (
                                <Tag color="green">Valid</Tag>
                              ) : (
                                <Tag color="red">Expired</Tag>
                              )}
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                ) : (
                  <div>No certificates available.</div>
                )}
              </Tabs.TabPane>
            </Tabs>
          )}
        </Modal>
      </div>
    </MainLayout>
  );
};

export default FleetsPage;
