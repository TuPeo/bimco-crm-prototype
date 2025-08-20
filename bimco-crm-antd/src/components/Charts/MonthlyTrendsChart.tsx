import React from 'react';
import { Line } from '@ant-design/charts';
import { Card } from 'antd';

interface MonthlyTrendsChartProps {
  data: { month: string; companies: number; contacts: number; events: number }[];
}

const MonthlyTrendsChart: React.FC<MonthlyTrendsChartProps> = ({ data }) => {
  // Transform data for multiple series
  const transformedData = data.flatMap(item => [
    { month: item.month, value: item.companies, type: 'Companies' },
    { month: item.month, value: item.contacts, type: 'Contacts' },
    { month: item.month, value: item.events, type: 'Events' },
  ]);

  const config = {
    data: transformedData,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
    color: ['#00557e', '#04a1ce', '#f08320'],
    autoFit: true,
  };

  return (
    <Card title="Monthly Growth Trends" size="small">
      <div style={{ height: '300px' }}>
        <Line {...config} />
      </div>
    </Card>
  );
};

export default MonthlyTrendsChart;
