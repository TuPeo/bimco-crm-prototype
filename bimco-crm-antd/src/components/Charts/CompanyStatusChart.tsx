import React from 'react';
import { Pie } from '@ant-design/charts';
import { Card } from 'antd';

interface CompanyStatusChartProps {
  data: { type: string; value: number }[];
}

const CompanyStatusChart: React.FC<CompanyStatusChartProps> = ({ data }) => {
  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer' as const,
      content: '{name} {percentage}',
    },
    interactions: [{ type: 'element-active' }],
    colors: ['#00557e', '#04a1ce', '#f08320', '#37b7dc', '#055a82'],
    autoFit: true,
  };

  return (
    <Card title="Company Status Distribution" size="small">
      <div style={{ height: '300px' }}>
        <Pie {...config} />
      </div>
    </Card>
  );
};

export default CompanyStatusChart;
