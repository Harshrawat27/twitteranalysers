import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { ContentTypeData } from '@/types';

interface ContentPerformanceProps {
  data: ContentTypeData[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

const ContentPerformance: React.FC<ContentPerformanceProps> = ({ data }) => {
  // Find the best performing content type
  const bestPerforming = data.reduce(
    (best, current) => (current.engagement > best.engagement ? current : best),
    data[0]
  );

  // Calculate total content distribution
  const totalContent = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className='space-y-8'>
      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          Content Type Distribution
        </h3>
        <ResponsiveContainer width='100%' height='90%'>
          <PieChart>
            <Pie
              data={data}
              dataKey='value'
              nameKey='type'
              cx='50%'
              cy='50%'
              outerRadius={120}
              fill='#8884d8'
              label={({ type, percent }) =>
                `${type}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [
                `${value} tweets (${((value / totalContent) * 100).toFixed(
                  1
                )}%)`,
                'Quantity',
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          Content Type vs. Engagement
        </h3>
        <ResponsiveContainer width='100%' height='90%'>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='type' />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [
                value.toLocaleString(),
                'Avg. Engagement',
              ]}
            />
            <Legend />
            <Bar
              dataKey='engagement'
              fill='#8884d8'
              name='Average Engagement'
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className='bg-indigo-50 p-5 rounded-lg border border-indigo-100'>
        <h3 className='text-lg font-semibold mb-3'>Key Insights</h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h4 className='font-medium text-indigo-800 mb-2'>
              Content Distribution
            </h4>
            <ul className='list-disc list-inside space-y-1 text-gray-700'>
              {data.map((item, index) => (
                <li key={index}>
                  <span className='font-medium'>{item.type}:</span> {item.value}{' '}
                  tweets ({((item.value / totalContent) * 100).toFixed(1)}%)
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-medium text-indigo-800 mb-2'>
              Engagement Analysis
            </h4>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Best performing format:</span>{' '}
              {bestPerforming.type}({bestPerforming.engagement.toLocaleString()}{' '}
              avg. engagement)
            </p>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Worst performing format:</span>{' '}
              {
                data.reduce(
                  (worst, current) =>
                    current.engagement < worst.engagement ? current : worst,
                  data[0]
                ).type
              }
            </p>
            <p className='text-gray-700'>
              <span className='font-medium'>Engagement ratio:</span>{' '}
              {(
                bestPerforming.engagement /
                data.reduce(
                  (worst, current) =>
                    current.engagement < worst.engagement ? current : worst,
                  data[0]
                ).engagement
              ).toFixed(1)}
              x difference between best and worst
            </p>
          </div>
        </div>

        <div className='mt-5 p-4 bg-white rounded border border-indigo-100'>
          <h4 className='font-medium text-indigo-800 mb-2'>Recommendations</h4>
          <ul className='list-disc list-inside space-y-1 text-gray-700'>
            <li>
              Increase {bestPerforming.type} content - it drives{' '}
              {(
                (bestPerforming.engagement /
                  data.reduce((sum, item) => sum + item.engagement, 0) /
                  data.length) *
                100
              ).toFixed(0)}
              % higher engagement than average
            </li>
            <li>
              Experiment with mixed formats (e.g., {bestPerforming.type} +{' '}
              {
                data
                  .filter((item) => item.type !== bestPerforming.type)
                  .reduce(
                    (best, current) =>
                      current.engagement > best.engagement ? current : best,
                    data.filter((item) => item.type !== bestPerforming.type)[0]
                  ).type
              }
              )
            </li>
            <li>
              Consider reducing{' '}
              {
                data.reduce(
                  (worst, current) =>
                    current.engagement < worst.engagement ? current : worst,
                  data[0]
                ).type
              }{' '}
              content unless it serves a specific strategic purpose
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContentPerformance;
