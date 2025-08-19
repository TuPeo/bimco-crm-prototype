'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format, subMonths, startOfMonth } from 'date-fns';

interface EventTrendChartProps {
  data: Array<{
    month: string;
    courses: number;
    events: number;
    participants: number;
  }>;
}

export default function EventTrendChart({ data }: EventTrendChartProps) {
  return (
    <div className="bimco-chart-container">
      <h3 className="bimco-chart-title">Courses & Events Trends (Last 12 Months)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
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
            dataKey="month" 
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
            labelFormatter={(value) => `Month: ${value}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="courses" 
            stroke="#0586ab" 
            strokeWidth={3}
            dot={{ fill: '#0586ab', strokeWidth: 2, r: 4 }}
            name="Courses"
          />
          <Line 
            type="monotone" 
            dataKey="events" 
            stroke="#d97706" 
            strokeWidth={3}
            dot={{ fill: '#d97706', strokeWidth: 2, r: 4 }}
            name="Events"
          />
          <Line 
            type="monotone" 
            dataKey="participants" 
            stroke="#059669" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#059669', strokeWidth: 2, r: 3 }}
            name="Total Participants"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
