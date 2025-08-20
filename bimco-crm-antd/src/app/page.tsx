'use client';

import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, List, Timeline } from 'antd';
import { 
  TeamOutlined, 
  UserOutlined, 
  CalendarOutlined, 
  CarOutlined,
  TrophyOutlined,
  ClockCircleOutlined 
} from '@ant-design/icons';
import MainLayout from '@/components/Layout/MainLayout';
import CompanyStatusChart from '@/components/Charts/CompanyStatusChart';
import CompanyByCountryChart from '@/components/Charts/CompanyByCountryChart';
import MonthlyTrendsChart from '@/components/Charts/MonthlyTrendsChart';
import RevenueChart from '@/components/Charts/RevenueChart';
import KPIGauges from '@/components/Charts/KPIGauges';
import CourseAnalytics from '@/components/Charts/CourseAnalytics';
import { 
  mockDashboardStats, 
  mockCompanies, 
  mockContacts, 
  mockCourses,
  companyStatusChartData,
  companyByCountryChartData,
  monthlyTrendsData,
  revenueData,
  kpiData,
  courseAnalyticsData
} from '@/data/mockData';

const Dashboard: React.FC = () => {
  const recentCompanies = mockCompanies.slice(0, 5);
  const recentContacts = mockContacts.slice(0, 5);
  const upcomingCourses = mockCourses.filter(course => course.status === 'Upcoming');

  const companyColumns = [
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Country',
      dataIndex: ['address', 'country'],
      key: 'country',
    },
    {
      title: 'Status',
      dataIndex: ['status', 'label'],
      key: 'status',
      render: (status: string) => (
        <Tag color={status.includes('Active') ? 'green' : 'blue'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Employees',
      dataIndex: 'numberOfEmployees',
      key: 'employees',
    },
  ];

  const recentActivities = [
    {
      time: '2 hours ago',
      action: 'New company registered: Maersk Line',
      type: 'company'
    },
    {
      time: '4 hours ago',
      action: 'Contact updated: Lars Nielsen',
      type: 'contact'
    },
    {
      time: '1 day ago',
      action: 'New course scheduled: Maritime Law and Regulations',
      type: 'course'
    },
    {
      time: '2 days ago',
      action: 'Fleet maintenance completed: Maersk Eindhoven',
      type: 'fleet'
    },
  ];

  return (
    <MainLayout>
      <div>
        <h1 style={{ marginBottom: 24, color: 'var(--bimco-blue)' }}>Welcome to BIMCO CRM</h1>
        
        {/* Stats Cards */}
        <Row gutter={16} className="dashboard-stats" style={{ marginBottom: 24 }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Companies"
                value={mockDashboardStats.totalCompanies}
                prefix={<TeamOutlined style={{ color: 'var(--bimco-blue)' }} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Contacts"
                value={mockDashboardStats.totalContacts}
                prefix={<UserOutlined style={{ color: 'var(--bimco-blue)' }} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Upcoming Events"
                value={mockDashboardStats.upcomingEvents}
                prefix={<CalendarOutlined style={{ color: 'var(--bimco-blue)' }} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Active Fleets"
                value={mockDashboardStats.activeFleets}
                prefix={<CarOutlined style={{ color: 'var(--bimco-blue)' }} />}
              />
            </Card>
          </Col>
        </Row>

        {/* KPI Gauges */}
        <div style={{ marginBottom: 24 }}>
          <KPIGauges data={kpiData} />
        </div>

        {/* Charts Section */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={12}>
            <CompanyStatusChart data={companyStatusChartData} />
          </Col>
          <Col span={12}>
            <CompanyByCountryChart data={companyByCountryChartData} />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={24}>
            <MonthlyTrendsChart data={monthlyTrendsData} />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={12}>
            <RevenueChart data={revenueData} />
          </Col>
          <Col span={12}>
            <CourseAnalytics data={courseAnalyticsData} />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            {/* Recent Companies */}
            <Card 
              title="Recent Companies" 
              extra={<a href="/companies">View All</a>}
              style={{ marginBottom: 16 }}
            >
              <Table
                dataSource={recentCompanies}
                columns={companyColumns}
                pagination={false}
                size="small"
                rowKey="id"
              />
            </Card>

            {/* Company Status Distribution */}
            <Card title="Company Status Distribution">
              <List
                size="small"
                dataSource={Object.entries(mockDashboardStats.companiesByStatus)}
                renderItem={([status, count]) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<TrophyOutlined style={{ color: 'var(--bimco-blue)' }} />}
                      title={status}
                      description={`${count} companies`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          <Col span={12}>
            {/* Upcoming Courses */}
            <Card 
              title="Upcoming Courses & Events" 
              extra={<a href="/courses">View All</a>}
              style={{ marginBottom: 16 }}
            >
              <List
                dataSource={upcomingCourses}
                renderItem={(course) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<CalendarOutlined style={{ color: 'var(--bimco-blue)' }} />}
                      title={course.title}
                      description={`${course.startDate} | ${course.location}`}
                    />
                    <Tag className="status-upcoming">{course.status}</Tag>
                  </List.Item>
                )}
              />
            </Card>

            {/* Recent Activities */}
            <Card title="Recent Activities">
              <Timeline
                items={recentActivities.map(activity => ({
                  children: (
                    <div>
                      <div style={{ fontWeight: 500 }}>{activity.action}</div>
                      <div style={{ color: '#999', fontSize: 12 }}>
                        <ClockCircleOutlined style={{ marginRight: 4 }} />
                        {activity.time}
                      </div>
                    </div>
                  )
                }))}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
