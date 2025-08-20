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
  Divider,
  List,
  Typography
} from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  EyeOutlined,
  ExportOutlined,
  FilterOutlined
} from '@ant-design/icons';
import MainLayout from '@/components/Layout/MainLayout';
import { mockCompanies, companyStatuses, companyTypes } from '@/data/mockData';
import { Company } from '@/types';

const { Search } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

const CompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(mockCompanies);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Filter and search functions
  const handleSearch = (value: string) => {
    const filtered = companies.filter(company =>
      company.name.toLowerCase().includes(value.toLowerCase()) ||
      company.registrationNumber.toLowerCase().includes(value.toLowerCase()) ||
      company.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  const handleStatusFilter = (status: string) => {
    if (!status) {
      setFilteredCompanies(companies);
      return;
    }
    const filtered = companies.filter(company => company.status.code === status);
    setFilteredCompanies(filtered);
  };

  const handleCountryFilter = (country: string) => {
    if (!country) {
      setFilteredCompanies(companies);
      return;
    }
    const filtered = companies.filter(company => company.address.country === country);
    setFilteredCompanies(filtered);
  };

  const showModal = () => {
    setSelectedCompany(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showDetailModal = (company: Company) => {
    setSelectedCompany(company);
    setIsDetailModalVisible(true);
  };

  const handleEdit = (company: Company) => {
    setSelectedCompany(company);
    form.setFieldsValue({
      ...company,
      statusCode: company.status.code,
      typeCode: company.type.code,
      country: company.address.country,
    });
    setIsModalVisible(true);
  };

  const handleSubmit = (values: any) => {
    // In real app, this would make API call
    console.log('Submitted values:', values);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Registration Number',
      dataIndex: 'registrationNumber',
      key: 'registrationNumber',
      sorter: (a: Company, b: Company) => a.registrationNumber.localeCompare(b.registrationNumber),
    },
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Company) => (
        <Button type="link" onClick={() => showDetailModal(record)}>
          {text}
        </Button>
      ),
      sorter: (a: Company, b: Company) => a.name.localeCompare(b.name),
    },
    {
      title: 'Status',
      dataIndex: ['status', 'label'],
      key: 'status',
      render: (status: string) => (
        <Tag color={status.includes('Active') ? 'green' : status.includes('Prospect') ? 'blue' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Type',
      dataIndex: ['type', 'label'],
      key: 'type',
    },
    {
      title: 'Country',
      dataIndex: ['address', 'country'],
      key: 'country',
    },
    {
      title: 'Employees',
      dataIndex: 'numberOfEmployees',
      key: 'employees',
      sorter: (a: Company, b: Company) => a.numberOfEmployees - b.numberOfEmployees,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Company) => (
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

  const uniqueCountries = [...new Set(companies.map(c => c.address.country))];

  return (
    <MainLayout>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0, color: 'var(--bimco-blue)' }}>Companies</Title>
          <Space>
            <Button icon={<ExportOutlined />}>Export</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
              Add Company
            </Button>
          </Space>
        </div>

        <Card>
          {/* Filters */}
          <div style={{ marginBottom: 16 }}>
            <Row gutter={16}>
              <Col span={8}>
                <Search
                  placeholder="Search companies..."
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
                  {companyStatuses.map(status => (
                    <Option key={status.code} value={status.code}>
                      {status.label}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={4}>
                <Select
                  placeholder="Country"
                  style={{ width: '100%' }}
                  onChange={handleCountryFilter}
                  allowClear
                >
                  {uniqueCountries.map(country => (
                    <Option key={country} value={country}>
                      {country}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </div>

          {/* Table */}
          <Table
            dataSource={filteredCompanies}
            columns={columns}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} companies`,
            }}
          />
        </Card>

        {/* Add/Edit Modal */}
        <Modal
          title={selectedCompany ? 'Edit Company' : 'Add New Company'}
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
                  name="registrationNumber"
                  label="Registration Number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Company Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="statusCode"
                  label="Status"
                  rules={[{ required: true }]}
                >
                  <Select>
                    {companyStatuses.map(status => (
                      <Option key={status.code} value={status.code}>
                        {status.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="typeCode"
                  label="Type"
                  rules={[{ required: true }]}
                >
                  <Select>
                    {companyTypes.map(type => (
                      <Option key={type.code} value={type.code}>
                        {type.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: 'email' }]}
            >
              <Input />
            </Form.Item>

            <Title level={4}>Address</Title>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name={['address', 'line1']} label="Address Line 1">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={['address', 'postCode']} label="Post Code">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="country" label="Country">
                  <Select>
                    {uniqueCountries.map(country => (
                      <Option key={country} value={country}>
                        {country}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="numberOfEmployees" label="Number of Employees">
                  <Input type="number" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {selectedCompany ? 'Update' : 'Create'}
                </Button>
                <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Company Detail Modal */}
        <Modal
          title="Company Details"
          open={isDetailModalVisible}
          onCancel={() => setIsDetailModalVisible(false)}
          footer={[
            <Button key="edit" type="primary" onClick={() => {
              setIsDetailModalVisible(false);
              handleEdit(selectedCompany!);
            }}>
              Edit
            </Button>,
            <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
              Close
            </Button>
          ]}
          width={1000}
        >
          {selectedCompany && (
            <Tabs defaultActiveKey="general">
              <Tabs.TabPane tab="General" key="general">
                <Row gutter={16}>
                  <Col span={12}>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Registration Number:</Text>
                      <div>{selectedCompany.registrationNumber}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Company Name:</Text>
                      <div>{selectedCompany.name}</div>
                    </div>
                    {selectedCompany.name2 && (
                      <div style={{ marginBottom: 16 }}>
                        <Text strong>Company Name 2:</Text>
                        <div>{selectedCompany.name2}</div>
                      </div>
                    )}
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Status:</Text>
                      <div>
                        <Tag color={selectedCompany.status.label.includes('Active') ? 'green' : 'blue'}>
                          {selectedCompany.status.label}
                        </Tag>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Type:</Text>
                      <div>{selectedCompany.type.label}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Email:</Text>
                      <div>{selectedCompany.email}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Number of Employees:</Text>
                      <div>{selectedCompany.numberOfEmployees}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Date Created:</Text>
                      <div>{selectedCompany.dateCreated}</div>
                    </div>
                  </Col>
                </Row>
              </Tabs.TabPane>
              
              <Tabs.TabPane tab="Address" key="address">
                <div style={{ marginBottom: 16 }}>
                  <Text strong>Address:</Text>
                  <div>{selectedCompany.address.line1}</div>
                  {selectedCompany.address.line2 && <div>{selectedCompany.address.line2}</div>}
                  <div>{selectedCompany.address.postCode} {selectedCompany.address.country}</div>
                </div>
              </Tabs.TabPane>
              
              <Tabs.TabPane tab="Associated Contacts" key="contacts">
                {selectedCompany.contacts && selectedCompany.contacts.length > 0 ? (
                  <List
                    dataSource={selectedCompany.contacts}
                    renderItem={(contact) => (
                      <List.Item>
                        <List.Item.Meta
                          title={`${contact.firstName} ${contact.lastName}`}
                          description={
                            <div>
                              <div>{contact.role} | {contact.email}</div>
                              <div>{contact.phone}</div>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                ) : (
                  <div>No contacts associated with this company.</div>
                )}
              </Tabs.TabPane>
            </Tabs>
          )}
        </Modal>
      </div>
    </MainLayout>
  );
};

export default CompaniesPage;
