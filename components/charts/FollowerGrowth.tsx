import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { FollowerGrowthData } from '@/types';

interface FollowerGrowthProps {
  data: FollowerGrowthData[];
}

const FollowerGrowth: React.FC<FollowerGrowthProps> = ({ data }) => {
  return (
    <div className='space-y-8'>
      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          Follower Growth Over Time
        </h3>
        <ResponsiveContainer width='100%' height='90%'>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='day' />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [
                value.toLocaleString(),
                'Followers',
              ]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
            <Line
              type='monotone'
              dataKey='followers'
              stroke='#8884d8'
              activeDot={{ r: 8 }}
              strokeWidth={2}
              name='Total Followers'
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>Daily Follower Change</h3>
        <ResponsiveContainer width='100%' height='90%'>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='day' />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [
                value.toLocaleString(),
                'Daily Change',
              ]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
            <Bar
              dataKey='dailyChange'
              fill='#82ca9d'
              name='Daily Follower Change'
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className='bg-indigo-50 p-4 rounded-lg border border-indigo-100'>
        <h3 className='text-lg font-semibold mb-2'>Key Insights</h3>
        <ul className='list-disc list-inside space-y-2 text-gray-700'>
          <li>
            <strong>Average daily growth: </strong>
            {data.reduce((acc, item) => acc + item.dailyChange, 0) /
              data.length >
            0
              ? Math.round(
                  data.reduce((acc, item) => acc + item.dailyChange, 0) /
                    data.length
                ).toLocaleString()
              : 0}{' '}
            followers per day
          </li>
          <li>
            <strong>Best growth day: </strong>
            {
              data.reduce(
                (best, current) =>
                  current.dailyChange > best.dailyChange ? current : best,
                data[0]
              ).day
            }
            (
            {data
              .reduce(
                (best, current) =>
                  current.dailyChange > best.dailyChange ? current : best,
                data[0]
              )
              .dailyChange.toLocaleString()}{' '}
            new followers)
          </li>
          <li>
            <strong>Growth trend: </strong>
            {data[data.length - 1].followers > data[0].followers
              ? 'Increasing over time'
              : data[data.length - 1].followers < data[0].followers
              ? 'Decreasing over time'
              : 'Relatively stable'}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FollowerGrowth;
