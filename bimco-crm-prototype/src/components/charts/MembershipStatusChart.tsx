'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface MembershipStatusChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export default function MembershipStatusChart({ data }: MembershipStatusChartProps) {
  // Use BIMCO colors for better visibility and brand consistency
  const COLORS = [
    '#059669', // Active Members (M1) - Green
    '#0586ab', // Associate Members (M2) - BIMCO Light Blue  
    '#6b7280', // Inactive - Gray
    '#d97706', // Prospects - Orange/Yellow
  ];

  return (
    <div className="bimco-chart-container">
      <h3 className="bimco-chart-title">Membership Status Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
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
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value, entry) => (
              <span style={{ color: entry.color }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
