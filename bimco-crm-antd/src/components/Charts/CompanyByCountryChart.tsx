import React from 'react';
import { Column } from '@ant-design/charts';
import { Card } from 'antd';

interface CompanyByCountryChartProps {
  data: { country: string; value: number }[];
}

const CompanyByCountryChart: React.FC<CompanyByCountryChartProps> = ({ data }) => {
  const config = {
    data,
    xField: 'country',
    yField: 'value',
    label: {
      position: 'middle' as const,
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      country: {
        alias: 'Country',
      },
      value: {
        alias: 'Companies',
      },
    },
    color: '#00557e',
    autoFit: true,
  };

  return (
    <Card title="Companies by Country" size="small">
      <div style={{ height: '300px' }}>
        <Column {...config} />
      </div>
    </Card>
  );
};

export default CompanyByCountryChart;
