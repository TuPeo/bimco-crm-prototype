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
  Divider
} from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  EyeOutlined,
  ExportOutlined,
  UserOutlined
} from '@ant-design/icons';
import MainLayout from '@/components/Layout/MainLayout';
import { mockContacts, mockCompanies } from '@/data/mockData';
import { Contact } from '@/types';

const { Search } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(mockContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleSearch = (value: string) => {
    const filtered = contacts.filter(contact =>
      contact.firstName.toLowerCase().includes(value.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(value.toLowerCase()) ||
      contact.email.toLowerCase().includes(value.toLowerCase()) ||
      contact.contactNumber.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  const handleStatusFilter = (status: string) => {
    if (!status) {
      setFilteredContacts(contacts);
      return;
    }
    const filtered = contacts.filter(contact => contact.status === status);
    setFilteredContacts(filtered);
  };

  const handleCompanyFilter = (companyId: string) => {
    if (!companyId) {
      setFilteredContacts(contacts);
      return;
    }
    const filtered = contacts.filter(contact => contact.companyId === companyId);
    setFilteredContacts(filtered);
  };

  const showModal = () => {
    setSelectedContact(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showDetailModal = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDetailModalVisible(true);
  };

  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    form.setFieldsValue(contact);
    setIsModalVisible(true);
  };

  const handleSubmit = (values: any) => {
    console.log('Submitted values:', values);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
      sorter: (a: Contact, b: Contact) => a.contactNumber.localeCompare(b.contactNumber),
    },
    {
      title: 'Name',
      key: 'name',
      render: (_: any, record: Contact) => (
        <Button type="link" onClick={() => showDetailModal(record)}>
          {`${record.firstName} ${record.lastName}`}
        </Button>
      ),
      sorter: (a: Contact, b: Contact) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Company',
      key: 'company',
      render: (_: any, record: Contact) => record.company?.name || 'N/A',
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
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Contact) => (
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

  return (
    <MainLayout>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0, color: 'var(--bimco-blue)' }}>Contacts</Title>
          <Space>
            <Button icon={<ExportOutlined />}>Export</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
              Add Contact
            </Button>
          </Space>
        </div>

        <Card>
          {/* Filters */}
          <div style={{ marginBottom: 16 }}>
            <Row gutter={16}>
              <Col span={8}>
                <Search
                  placeholder="Search contacts..."
                  onSearch={handleSearch}
                  style={{ width: '100%' }}
                />
              </Col>
              <Col span={4}>
                <Select
                  placeholder="Status"
                  style={{ width: '100%' }}
                  onChange={handleStatusFilter}
                  allowClear
                >
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </Col>
              <Col span={6}>
                <Select
                  placeholder="Company"
                  style={{ width: '100%' }}
                  onChange={handleCompanyFilter}
                  allowClear
                  showSearch
                  optionFilterProp="children"
                >
                  {mockCompanies.map(company => (
                    <Option key={company.id} value={company.id}>
                      {company.name}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </div>

          {/* Table */}
          <Table
            dataSource={filteredContacts}
            columns={columns}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} contacts`,
            }}
          />
        </Card>

        {/* Add/Edit Modal */}
        <Modal
          title={selectedContact ? 'Edit Contact' : 'Add New Contact'}
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
                  name="firstName"
                  label="First Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, type: 'email' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="phone" label="Phone">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="role" label="Role">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="department" label="Department">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="companyId"
                  label="Company"
                  rules={[{ required: true }]}
                >
                  <Select
                    showSearch
                    placeholder="Select a company"
                    optionFilterProp="children"
                  >
                    {mockCompanies.map(company => (
                      <Option key={company.id} value={company.id}>
                        {company.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
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
              </Col>
            </Row>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {selectedContact ? 'Update' : 'Create'}
                </Button>
                <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Contact Detail Modal */}
        <Modal
          title="Contact Details"
          open={isDetailModalVisible}
          onCancel={() => setIsDetailModalVisible(false)}
          footer={[
            <Button key="edit" type="primary" onClick={() => {
              setIsDetailModalVisible(false);
              handleEdit(selectedContact!);
            }}>
              Edit
            </Button>,
            <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
              Close
            </Button>
          ]}
          width={900}
        >
          {selectedContact && (
            <Tabs defaultActiveKey="general">
              <Tabs.TabPane tab="General Info" key="general">
                <Row gutter={16}>
                  <Col span={12}>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Contact Number:</Text>
                      <div>{selectedContact.contactNumber}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Full Name:</Text>
                      <div>{`${selectedContact.firstName} ${selectedContact.lastName}`}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Email:</Text>
                      <div>{selectedContact.email}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Phone:</Text>
                      <div>{selectedContact.phone || 'N/A'}</div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Role:</Text>
                      <div>{selectedContact.role || 'N/A'}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Department:</Text>
                      <div>{selectedContact.department || 'N/A'}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Status:</Text>
                      <div>
                        <Tag color={selectedContact.status === 'Active' ? 'green' : 'red'}>
                          {selectedContact.status}
                        </Tag>
                      </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Date Created:</Text>
                      <div>{selectedContact.dateCreated}</div>
                    </div>
                  </Col>
                </Row>
              </Tabs.TabPane>
              
              <Tabs.TabPane tab="Company Association" key="company">
                {selectedContact.company ? (
                  <div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Company Name:</Text>
                      <div>{selectedContact.company.name}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Registration Number:</Text>
                      <div>{selectedContact.company.registrationNumber}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Company Status:</Text>
                      <div>
                        <Tag color="blue">{selectedContact.company.status.label}</Tag>
                      </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Company Address:</Text>
                      <div>
                        {selectedContact.company.address.line1}<br/>
                        {selectedContact.company.address.postCode} {selectedContact.company.address.country}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>No company association found.</div>
                )}
              </Tabs.TabPane>
              
              <Tabs.TabPane tab="Classifications" key="classifications">
                {selectedContact.classifications && selectedContact.classifications.length > 0 ? (
                  <List
                    dataSource={selectedContact.classifications}
                    renderItem={(classification) => (
                      <List.Item>
                        <List.Item.Meta
                          title={classification.code}
                          description={
                            <div>
                              <div>{classification.description}</div>
                              <div style={{ color: '#999', fontSize: 12 }}>
                                Date: {classification.date}
                              </div>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                ) : (
                  <div>No classifications assigned.</div>
                )}
              </Tabs.TabPane>
            </Tabs>
          )}
        </Modal>
      </div>
    </MainLayout>
  );
};

export default ContactsPage;
