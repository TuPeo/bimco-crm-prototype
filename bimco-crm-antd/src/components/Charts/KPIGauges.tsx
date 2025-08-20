import React from 'react';
import { Card, Row, Col, Statistic, Progress } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface KPIGaugesProps {
  data: {
    membershipGrowth: number;
    courseCompletion: number;
    customerSatisfaction: number;
    fleetUtilization: number;
  };
}

const KPIGauges: React.FC<KPIGaugesProps> = ({ data }) => {
  return (
    <Card title="Key Performance Indicators" size="small">
      <Row gutter={24}>
        <Col span={6}>
          <div style={{ textAlign: 'center' }}>
            <Progress
              type="circle"
              percent={data.membershipGrowth}
              strokeColor="#00557e"
              size={120}
              format={(percent) => `${percent}%`}
            />
            <Statistic
              title="Membership Growth"
              value={data.membershipGrowth}
              precision={1}
              valueStyle={{ color: '#00557e', fontSize: '16px' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </div>
        </Col>
        <Col span={6}>
          <div style={{ textAlign: 'center' }}>
            <Progress
              type="circle"
              percent={data.courseCompletion}
              strokeColor="#04a1ce"
              size={120}
              format={(percent) => `${percent}%`}
            />
            <Statistic
              title="Course Completion"
              value={data.courseCompletion}
              precision={1}
              valueStyle={{ color: '#04a1ce', fontSize: '16px' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </div>
        </Col>
        <Col span={6}>
          <div style={{ textAlign: 'center' }}>
            <Progress
              type="circle"
              percent={data.customerSatisfaction}
              strokeColor="#f08320"
              size={120}
              format={(percent) => `${percent}%`}
            />
            <Statistic
              title="Customer Satisfaction"
              value={data.customerSatisfaction}
              precision={1}
              valueStyle={{ color: '#f08320', fontSize: '16px' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </div>
        </Col>
        <Col span={6}>
          <div style={{ textAlign: 'center' }}>
            <Progress
              type="circle"
              percent={data.fleetUtilization}
              strokeColor="#37b7dc"
              size={120}
              format={(percent) => `${percent}%`}
            />
            <Statistic
              title="Fleet Utilization"
              value={data.fleetUtilization}
              precision={1}
              valueStyle={{ color: '#37b7dc', fontSize: '16px' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default KPIGauges;
