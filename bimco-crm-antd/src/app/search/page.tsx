'use client';

import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Input, 
  Select, 
  Row, 
  Col, 
  List, 
  Typography, 
  Tag,
  Button,
  Space,
  Tabs,
  Empty,
  Divider
} from 'antd';
import { 
  SearchOutlined, 
  TeamOutlined, 
  UserOutlined, 
  BookOutlined,
  CarOutlined,
  ExportOutlined,
  PlusOutlined
} from '@ant-design/icons';
import MainLayout from '@/components/Layout/MainLayout';
import { mockCompanies, mockContacts, mockCourses, mockFleets } from '@/data/mockData';
import { SearchResult } from '@/types';

const { Search } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(false);

  const performSearch = (term: string, types: string[] = []) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const searchResults: SearchResult[] = [];

    // Search Companies
    if (types.length === 0 || types.includes('Company')) {
      const companyResults = mockCompanies.filter(company =>
        company.name.toLowerCase().includes(term.toLowerCase()) ||
        company.registrationNumber.toLowerCase().includes(term.toLowerCase()) ||
        company.email.toLowerCase().includes(term.toLowerCase())
      ).map(company => ({
        type: 'Company' as const,
        id: company.id,
        title: company.name,
        subtitle: company.registrationNumber,
        description: `${company.status.label} | ${company.address.country} | ${company.numberOfEmployees} employees`,
        url: `/companies/${company.id}`
      }));
      searchResults.push(...companyResults);
    }

    // Search Contacts
    if (types.length === 0 || types.includes('Contact')) {
      const contactResults = mockContacts.filter(contact =>
        contact.firstName.toLowerCase().includes(term.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(term.toLowerCase()) ||
        contact.email.toLowerCase().includes(term.toLowerCase()) ||
        contact.contactNumber.toLowerCase().includes(term.toLowerCase())
      ).map(contact => ({
        type: 'Contact' as const,
        id: contact.id,
        title: `${contact.firstName} ${contact.lastName}`,
        subtitle: contact.email,
        description: `${contact.role || 'N/A'} at ${contact.company?.name || 'Unknown Company'} | ${contact.status}`,
        url: `/contacts/${contact.id}`
      }));
      searchResults.push(...contactResults);
    }

    // Search Courses
    if (types.length === 0 || types.includes('Course')) {
      const courseResults = mockCourses.filter(course =>
        course.title.toLowerCase().includes(term.toLowerCase()) ||
        course.category.toLowerCase().includes(term.toLowerCase()) ||
        course.location.toLowerCase().includes(term.toLowerCase())
      ).map(course => ({
        type: 'Course' as const,
        id: course.id,
        title: course.title,
        subtitle: `${course.type} | ${course.category}`,
        description: `${course.startDate} | ${course.location} | ${course.participants.length} participants`,
        url: `/courses/${course.id}`
      }));
      searchResults.push(...courseResults);
    }

    // Search Fleets
    if (types.length === 0 || types.includes('Fleet')) {
      const fleetResults = mockFleets.filter(fleet =>
        fleet.name.toLowerCase().includes(term.toLowerCase()) ||
        fleet.registrationNumber.toLowerCase().includes(term.toLowerCase()) ||
        fleet.type.toLowerCase().includes(term.toLowerCase())
      ).map(fleet => ({
        type: 'Fleet' as const,
        id: fleet.id,
        title: fleet.name,
        subtitle: fleet.registrationNumber,
        description: `${fleet.type} | Capacity: ${fleet.capacity.toLocaleString()} TEU | ${fleet.operationalStatus}`,
        url: `/fleets/${fleet.id}`
      }));
      searchResults.push(...fleetResults);
    }

    setTimeout(() => {
      setResults(searchResults);
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    performSearch(searchTerm, selectedTypes);
  }, [searchTerm, selectedTypes]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleTypeChange = (types: string[]) => {
    setSelectedTypes(types);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'Company': return <TeamOutlined />;
      case 'Contact': return <UserOutlined />;
      case 'Course': return <BookOutlined />;
      case 'Fleet': return <CarOutlined />;
      default: return null;
    }
  };

  const getTagColor = (type: string) => {
    switch (type) {
      case 'Company': return 'blue';
      case 'Contact': return 'green';
      case 'Course': return 'orange';
      case 'Fleet': return 'purple';
      default: return 'default';
    }
  };

  const filteredResults = activeTab === 'all' 
    ? results 
    : results.filter(result => result.type.toLowerCase() === activeTab);

  const resultCounts = {
    all: results.length,
    company: results.filter(r => r.type === 'Company').length,
    contact: results.filter(r => r.type === 'Contact').length,
    course: results.filter(r => r.type === 'Course').length,
    fleet: results.filter(r => r.type === 'Fleet').length,
  };

  const createSegmentFromResults = () => {
    // In a real app, this would create a new segment with the current search results
    console.log('Creating segment from search results:', filteredResults);
  };

  const exportResults = () => {
    // In a real app, this would export the results to CSV/Excel
    console.log('Exporting search results:', filteredResults);
  };

  return (
    <MainLayout>
      <div>
        <Title level={2} style={{ marginBottom: 24, color: 'var(--bimco-blue)' }}>Global Search</Title>

        <Card style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Search
                placeholder="Search across all modules..."
                size="large"
                onSearch={handleSearch}
                onChange={(e) => setSearchTerm(e.target.value)}
                enterButton
                loading={loading}
              />
            </Col>
            <Col span={8}>
              <Select
                mode="multiple"
                placeholder="Filter by type"
                style={{ width: '100%' }}
                onChange={handleTypeChange}
                allowClear
              >
                <Option value="Company">Companies</Option>
                <Option value="Contact">Contacts</Option>
                <Option value="Course">Courses & Events</Option>
                <Option value="Fleet">Fleets</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Space>
                <Button 
                  icon={<ExportOutlined />} 
                  onClick={exportResults}
                  disabled={filteredResults.length === 0}
                >
                  Export
                </Button>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={createSegmentFromResults}
                  disabled={filteredResults.length === 0}
                >
                  Create Segment
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        <Card>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              {
                key: 'all',
                label: `All Results (${resultCounts.all})`,
                children: null,
              },
              {
                key: 'company',
                label: `Companies (${resultCounts.company})`,
                children: null,
              },
              {
                key: 'contact',
                label: `Contacts (${resultCounts.contact})`,
                children: null,
              },
              {
                key: 'course',
                label: `Courses (${resultCounts.course})`,
                children: null,
              },
              {
                key: 'fleet',
                label: `Fleets (${resultCounts.fleet})`,
                children: null,
              },
            ]}
          />

          <Divider />

          {filteredResults.length === 0 ? (
            <Empty 
              description={
                searchTerm 
                  ? "No results found. Try adjusting your search criteria or filters."
                  : "Enter a search term to find companies, contacts, courses, and fleets."
              }
            />
          ) : (
            <>
              <div style={{ marginBottom: 16 }}>
                <Text strong>
                  Showing {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
                  {searchTerm && ` for "${searchTerm}"`}
                </Text>
              </div>
              
              <List
                dataSource={filteredResults}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button type="link" href={item.url} key="view">
                        View Details
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={getIcon(item.type)}
                      title={
                        <div>
                          <a href={item.url}>{item.title}</a>
                          <Tag 
                            color={getTagColor(item.type)} 
                            style={{ marginLeft: 8 }}
                          >
                            {item.type}
                          </Tag>
                        </div>
                      }
                      description={
                        <div>
                          {item.subtitle && (
                            <div style={{ fontWeight: 500, marginBottom: 4 }}>
                              {item.subtitle}
                            </div>
                          )}
                          <div style={{ color: '#666' }}>
                            {item.description}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
                pagination={{
                  pageSize: 20,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => 
                    `${range[0]}-${range[1]} of ${total} results`,
                }}
              />
            </>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default SearchPage;
