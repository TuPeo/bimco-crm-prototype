import React from 'react';
import { DualAxes } from '@ant-design/charts';
import { Card } from 'antd';

interface CourseAnalyticsProps {
  data: { 
    month: string; 
    enrollments: number; 
    completions: number; 
    revenue: number; 
  }[];
}

const CourseAnalytics: React.FC<CourseAnalyticsProps> = ({ data }) => {
  const config = {
    data: [data, data],
    xField: 'month',
    yField: ['enrollments', 'revenue'],
    geometryOptions: [
      {
        geometry: 'column',
        color: '#00557e',
        columnWidthRatio: 0.4,
      },
      {
        geometry: 'line',
        smooth: true,
        lineStyle: {
          lineWidth: 2,
        },
        color: '#f08320',
      },
    ],
    meta: {
      enrollments: {
        alias: 'Enrollments',
      },
      revenue: {
        alias: 'Revenue (USD)',
        formatter: (v: number) => `$${v.toLocaleString()}`,
      },
    },
    autoFit: true,
  };

  return (
    <Card title="Course Enrollments vs Revenue" size="small">
      <div style={{ height: '300px' }}>
        <DualAxes {...config} />
      </div>
    </Card>
  );
};

export default CourseAnalytics;
