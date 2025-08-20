import React from 'react';
import { Area } from '@ant-design/charts';
import { Card } from 'antd';

interface RevenueChartProps {
  data: { month: string; membership: number; courses: number; events: number }[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  // Transform data for stacked area
  const transformedData = data.flatMap(item => [
    { month: item.month, value: item.membership, type: 'Membership Revenue' },
    { month: item.month, value: item.courses, type: 'Course Revenue' },
    { month: item.month, value: item.events, type: 'Event Revenue' },
  ]);

  const config = {
    data: transformedData,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    isStack: true,
    animation: {
      appear: {
        animation: 'wave-in',
        duration: 5000,
      },
    },
    color: ['#00557e', '#04a1ce', '#f08320'],
    autoFit: true,
  };

  return (
    <Card title="Revenue Breakdown (Monthly)" size="small">
      <div style={{ height: '300px' }}>
        <Area {...config} />
      </div>
    </Card>
  );
};

export default RevenueChart;
