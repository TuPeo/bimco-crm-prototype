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
  DatePicker,
  Radio
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  EyeOutlined,
  ExportOutlined,
  CalendarOutlined,
  UserOutlined
} from '@ant-design/icons';
import MainLayout from '@/components/Layout/MainLayout';
import { mockCourses } from '@/data/mockData';
import { Course } from '@/types';
import dayjs from 'dayjs';

const { Search } = Input;
const { Option } = Select;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(mockCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleSearch = (value: string) => {
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(value.toLowerCase()) ||
      course.category.toLowerCase().includes(value.toLowerCase()) ||
      course.location.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleStatusFilter = (status: string) => {
    if (!status) {
      setFilteredCourses(courses);
      return;
    }
    const filtered = courses.filter(course => course.status === status);
    setFilteredCourses(filtered);
  };

  const handleTypeFilter = (type: string) => {
    if (!type) {
      setFilteredCourses(courses);
      return;
    }
    const filtered = courses.filter(course => course.type === type);
    setFilteredCourses(filtered);
  };

  const showModal = () => {
    setSelectedCourse(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showDetailModal = (course: Course) => {
    setSelectedCourse(course);
    setIsDetailModalVisible(true);
  };

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    form.setFieldsValue({
      ...course,
      dateRange: [dayjs(course.startDate), dayjs(course.endDate)],
    });
    setIsModalVisible(true);
  };

  const handleSubmit = (values: any) => {
    console.log('Submitted values:', values);
    setIsModalVisible(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming': return 'blue';
      case 'Ongoing': return 'orange';
      case 'Completed': return 'green';
      case 'Cancelled': return 'red';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Course) => (
        <Button type="link" onClick={() => showDetailModal(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: string) => (
        <Tag color={type === 'Course' ? 'blue' : 'purple'}>{type}</Tag>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 120,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 120,
      sorter: (a: Course, b: Course) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 120,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: 'Participants',
      key: 'participants',
      width: 100,
      render: (_: any, record: Course) => record.participants.length,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: any, record: Course) => (
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
          <Title level={2} style={{ margin: 0, color: 'var(--bimco-blue)' }}>Courses & Events</Title>
          <Space>
            <Button icon={<ExportOutlined />}>Export</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
              Add Course/Event
            </Button>
          </Space>
        </div>

        <Card>
          {/* Filters */}
          <div style={{ marginBottom: 16 }}>
            <Row gutter={16}>
              <Col span={6}>
                <Search
                  placeholder="Search courses..."
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
                  <Option value="Course">Course</Option>
                  <Option value="Event">Event</Option>
                </Select>
              </Col>
              <Col span={4}>
                <Select
                  placeholder="Status"
                  style={{ width: '100%' }}
                  onChange={handleStatusFilter}
                  allowClear
                >
                  <Option value="Upcoming">Upcoming</Option>
                  <Option value="Ongoing">Ongoing</Option>
                  <Option value="Completed">Completed</Option>
                  <Option value="Cancelled">Cancelled</Option>
                </Select>
              </Col>
              <Col span={6}>
                <RangePicker style={{ width: '100%' }} />
              </Col>
            </Row>
          </div>

          {/* Table */}
          <Table
            dataSource={filteredCourses}
            columns={columns}
            rowKey="id"
            scroll={{ x: 1200 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} courses/events`,
            }}
          />
        </Card>

        {/* Add/Edit Modal */}
        <Modal
          title={selectedCourse ? 'Edit Course/Event' : 'Add New Course/Event'}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={900}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[{ required: true }]}
                >
                  <Radio.Group>
                    <Radio.Button value="Course">Course</Radio.Button>
                    <Radio.Button value="Event">Event</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="Training">Training</Option>
                    <Option value="Conference">Conference</Option>
                    <Option value="Workshop">Workshop</Option>
                    <Option value="Seminar">Seminar</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="group"
                  label="Group"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="Upcoming">Upcoming</Option>
                    <Option value="Ongoing">Ongoing</Option>
                    <Option value="Completed">Completed</Option>
                    <Option value="Cancelled">Cancelled</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="dateRange"
                  label="Date Range"
                  rules={[{ required: true }]}
                >
                  <RangePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="location"
                  label="Location"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="description"
              label="Description"
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {selectedCourse ? 'Update' : 'Create'}
                </Button>
                <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Course Detail Modal */}
        <Modal
          title="Course/Event Details"
          open={isDetailModalVisible}
          onCancel={() => setIsDetailModalVisible(false)}
          footer={[
            <Button key="edit" type="primary" onClick={() => {
              setIsDetailModalVisible(false);
              handleEdit(selectedCourse!);
            }}>
              Edit
            </Button>,
            <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
              Close
            </Button>
          ]}
          width={1100}
        >
          {selectedCourse && (
            <Tabs defaultActiveKey="general">
              <Tabs.TabPane tab="General Info" key="general">
                <Row gutter={16}>
                  <Col span={12}>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>ID:</Text>
                      <div>{selectedCourse.id}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Title:</Text>
                      <div>{selectedCourse.title}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Type:</Text>
                      <div>
                        <Tag color={selectedCourse.type === 'Course' ? 'blue' : 'purple'}>
                          {selectedCourse.type}
                        </Tag>
                      </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Category:</Text>
                      <div>{selectedCourse.category}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Group:</Text>
                      <div>{selectedCourse.group}</div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Start Date:</Text>
                      <div>{selectedCourse.startDate}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>End Date:</Text>
                      <div>{selectedCourse.endDate}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Location:</Text>
                      <div>{selectedCourse.location}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Status:</Text>
                      <div>
                        <Tag color={getStatusColor(selectedCourse.status)}>
                          {selectedCourse.status}
                        </Tag>
                      </div>
                    </div>
                  </Col>
                </Row>
                {selectedCourse.description && (
                  <div style={{ marginTop: 16 }}>
                    <Text strong>Description:</Text>
                    <div style={{ marginTop: 8 }}>{selectedCourse.description}</div>
                  </div>
                )}
              </Tabs.TabPane>
              
              <Tabs.TabPane tab="Schedule" key="schedule">
                <div style={{ marginBottom: 16 }}>
                  <Text strong>Date & Time:</Text>
                  <div>{selectedCourse.startDate} - {selectedCourse.endDate}</div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <Text strong>Location:</Text>
                  <div>{selectedCourse.location}</div>
                </div>
                {selectedCourse.venue && (
                  <>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Venue:</Text>
                      <div>{selectedCourse.venue.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {selectedCourse.venue.address.line1}, {selectedCourse.venue.address.postCode} {selectedCourse.venue.address.country}
                      </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Capacity:</Text>
                      <div>{selectedCourse.venue.capacity} people</div>
                    </div>
                    {selectedCourse.venue.facilities && (
                      <div style={{ marginBottom: 16 }}>
                        <Text strong>Facilities:</Text>
                        <div>
                          {selectedCourse.venue.facilities.map(facility => (
                            <Tag key={facility} style={{ margin: 2 }}>{facility}</Tag>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </Tabs.TabPane>
              
              <Tabs.TabPane tab="Content & Program" key="content">
                {selectedCourse.agenda && (
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>Agenda:</Text>
                    <div style={{ whiteSpace: 'pre-line', marginTop: 8 }}>
                      {selectedCourse.agenda}
                    </div>
                  </div>
                )}
                {selectedCourse.materials && selectedCourse.materials.length > 0 && (
                  <div>
                    <Text strong>Materials:</Text>
                    <List
                      style={{ marginTop: 8 }}
                      dataSource={selectedCourse.materials}
                      renderItem={(material) => (
                        <List.Item>
                          <List.Item.Meta
                            title={material.name}
                            description={`${material.type} - Uploaded: ${material.uploadDate}`}
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                )}
              </Tabs.TabPane>
              
              <Tabs.TabPane tab="Participants" key="participants">
                <div style={{ marginBottom: 16 }}>
                  <Text strong>Total Participants:</Text> {selectedCourse.participants.length}
                </div>
                <List
                  dataSource={selectedCourse.participants}
                  renderItem={(participant) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<UserOutlined />}
                        title={`${participant.contact.firstName} ${participant.contact.lastName}`}
                        description={
                          <div>
                            <div>{participant.role} | {participant.contact.email}</div>
                            <div style={{ fontSize: '12px', color: '#666' }}>
                              Company: {participant.contact.company?.name || 'N/A'}
                            </div>
                            <div style={{ fontSize: '12px', color: '#666' }}>
                              Registered: {participant.registrationDate}
                            </div>
                          </div>
                        }
                      />
                      <Tag color="blue">{participant.role}</Tag>
                    </List.Item>
                  )}
                />
              </Tabs.TabPane>
            </Tabs>
          )}
        </Modal>
      </div>
    </MainLayout>
  );
};

export default CoursesPage;
