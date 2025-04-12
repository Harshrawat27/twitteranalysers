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
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';
import { TopicData } from '@/types';

interface TopicAnalysisProps {
  data: TopicData[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

const TopicAnalysis: React.FC<TopicAnalysisProps> = ({ data }) => {
  // Find the most discussed topic
  const mostDiscussed = data.reduce(
    (most, current) => (current.count > most.count ? current : most),
    data[0]
  );

  // Find the most engaging topic
  const mostEngaging = data.reduce(
    (most, current) =>
      current.avgEngagement > most.avgEngagement ? current : most,
    data[0]
  );

  // Calculate total topics
  const totalTopics = data.reduce((sum, item) => sum + item.count, 0);

  // Format data for scatter plot
  const scatterData = data.map((item) => ({
    topic: item.topic,
    count: item.count,
    engagement: item.avgEngagement,
    // Size will be proportional to count
    z: item.count,
  }));

  return (
    <div className='space-y-8'>
      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>Topic Distribution</h3>
        <ResponsiveContainer width='100%' height='90%'>
          <PieChart>
            <Pie
              data={data}
              dataKey='count'
              nameKey='topic'
              cx='50%'
              cy='50%'
              outerRadius={120}
              fill='#8884d8'
              label={({ topic, percent }) =>
                `${topic}: ${(percent * 100).toFixed(0)}%`
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
                `${value} tweets (${((value / totalTopics) * 100).toFixed(
                  1
                )}%)`,
                'Count',
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          Topic vs. Average Engagement
        </h3>
        <ResponsiveContainer width='100%' height='90%'>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='topic' />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [
                value.toLocaleString(),
                'Avg. Engagement',
              ]}
            />
            <Legend />
            <Bar
              dataKey='avgEngagement'
              fill='#82ca9d'
              name='Average Engagement'
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          Topic Frequency vs. Engagement
        </h3>
        <ResponsiveContainer width='100%' height='90%'>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis
              dataKey='count'
              name='Tweet Count'
              type='number'
              label={{
                value: 'Tweet Count',
                position: 'insideBottom',
                offset: -5,
              }}
            />
            <YAxis
              dataKey='engagement'
              name='Avg. Engagement'
              label={{
                value: 'Avg. Engagement',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <ZAxis dataKey='z' range={[50, 500]} name='Size' />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value: number, name: string, props: any) => {
                if (name === 'Tweet Count') return [value, 'Tweet Count'];
                if (name === 'Avg. Engagement')
                  return [value.toLocaleString(), 'Avg. Engagement'];
                return [value, name];
              }}
              labelFormatter={(value, entry) =>
                entry?.[0]?.payload?.topic || ''
              }
            />
            <Legend />
            <Scatter
              name='Topics'
              data={scatterData}
              fill='#8884d8'
              shape='circle'
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className='bg-green-50 p-5 rounded-lg border border-green-100'>
        <h3 className='text-lg font-semibold mb-3'>Topic Insights</h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h4 className='font-medium text-green-800 mb-2'>Topic Frequency</h4>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Most discussed:</span>{' '}
              {mostDiscussed.topic}({mostDiscussed.count} tweets,{' '}
              {((mostDiscussed.count / totalTopics) * 100).toFixed(1)}% of
              content)
            </p>
            <div className='mt-4'>
              <h5 className='font-medium text-green-700 mb-1'>Topic Balance</h5>
              <div className='flex flex-wrap gap-2'>
                {data.map((item, index) => (
                  <div
                    key={index}
                    className='px-2 py-1 rounded-full text-xs font-semibold'
                    style={{
                      backgroundColor: `${COLORS[index % COLORS.length]}20`,
                      color: COLORS[index % COLORS.length],
                      border: `1px solid ${COLORS[index % COLORS.length]}`,
                    }}
                  >
                    {item.topic}:{' '}
                    {((item.count / totalTopics) * 100).toFixed(0)}%
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className='font-medium text-green-800 mb-2'>
              Engagement Analysis
            </h4>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Most engaging topic:</span>{' '}
              {mostEngaging.topic}({mostEngaging.avgEngagement.toLocaleString()}{' '}
              avg. engagement)
            </p>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Least engaging topic:</span>{' '}
              {
                data.reduce(
                  (least, current) =>
                    current.avgEngagement < least.avgEngagement
                      ? current
                      : least,
                  data[0]
                ).topic
              }
            </p>
            <p className='text-gray-700'>
              <span className='font-medium'>Engagement ratio:</span>{' '}
              {(
                mostEngaging.avgEngagement /
                data.reduce(
                  (least, current) =>
                    current.avgEngagement < least.avgEngagement
                      ? current
                      : least,
                  data[0]
                ).avgEngagement
              ).toFixed(1)}
              x difference between best and worst
            </p>
          </div>
        </div>

        <div className='mt-5 p-4 bg-white rounded border border-green-100'>
          <h4 className='font-medium text-green-800 mb-2'>
            Strategic Recommendations
          </h4>
          <ul className='list-disc list-inside space-y-1 text-gray-700'>
            <li>
              <span className='font-medium'>Content focus:</span> Create more
              content about {mostEngaging.topic} - it drives{' '}
              {(
                (mostEngaging.avgEngagement /
                  (data.reduce((sum, item) => sum + item.avgEngagement, 0) /
                    data.length)) *
                  100 -
                100
              ).toFixed(0)}
              % higher engagement than average
            </li>
            <li>
              <span className='font-medium'>Topic balance:</span>{' '}
              {mostDiscussed.topic === mostEngaging.topic
                ? `Continue focusing on ${mostDiscussed.topic} - it's both frequent and engaging`
                : `Consider shifting some content from ${mostDiscussed.topic} to ${mostEngaging.topic} for better engagement`}
            </li>
            <li>
              <span className='font-medium'>Topic diversification:</span>{' '}
              {data.length < 4
                ? 'Consider exploring more diverse topics to find new audience segments'
                : 'You have a good diversity of topics - focus on optimizing the top performers'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopicAnalysis;
