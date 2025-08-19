'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ContactRoleChartProps {
  data: Array<{
    role: string;
    active: number;
    inactive: number;
  }>;
}

export default function ContactRoleChart({ data }: ContactRoleChartProps) {
  return (
    <div className="bimco-chart-container">
      <h3 className="bimco-chart-title">Contact Distribution by Role</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--bimco-border-light)" />
          <XAxis 
            dataKey="role" 
            tick={{ fill: 'var(--bimco-text-secondary)', fontSize: 12 }}
            tickLine={{ stroke: 'var(--bimco-border-medium)' }}
          />
          <YAxis 
            tick={{ fill: 'var(--bimco-text-secondary)', fontSize: 12 }}
            tickLine={{ stroke: 'var(--bimco-border-medium)' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--bimco-bg-primary)',
              border: '1px solid var(--bimco-border-light)',
              borderRadius: '8px'
            }}
            formatter={(value: number, name: string) => [
              `${value} contacts`, 
              name === 'active' ? 'Active' : 'Inactive'
            ]}
          />
          <Legend />
          <Bar 
            dataKey="active" 
            stackId="a" 
            fill="#059669" 
            name="Active"
            radius={[0, 0, 0, 0]}
          />
          <Bar 
            dataKey="inactive" 
            stackId="a" 
            fill="#dc2626" 
            name="Inactive"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
