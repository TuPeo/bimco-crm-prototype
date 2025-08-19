'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, PieLabelRenderProps } from 'recharts';

interface CompanyDistributionChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export default function CompanyDistributionChart({ data }: CompanyDistributionChartProps) {
  // Diverse colors for better visibility - inspired by MembershipStatusChart
  const COLORS = [
    '#0586ab', // BIMCO Light Blue
    '#059669', // Green
    '#d97706', // Orange 
    '#dc2626', // Red
    '#7c3aed', // Purple
    '#0891b2', // Cyan
    '#be185d', // Pink
    '#65a30d', // Lime
    '#ea580c', // Orange Red
    '#1d4ed8'  // Blue
  ];

  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent 
  }: PieLabelRenderProps) => {
    if (!cx || !cy || !midAngle || !innerRadius || !outerRadius || !percent) {
      return null;
    }
    const RADIAN = Math.PI / 180;
    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
    const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
    const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > Number(cx) ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bimco-chart-container">
      <h3 className="bimco-chart-title">Company Distribution by Country</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number, name: string) => [`${value} companies`, name]}
            contentStyle={{
              backgroundColor: 'var(--bimco-bg-primary)',
              border: '1px solid var(--bimco-border-light)',
              borderRadius: '8px'
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
