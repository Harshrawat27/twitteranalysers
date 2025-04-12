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
  LineChart,
  Line,
} from 'recharts';
import { EngagementData } from '@/types';

interface EngagementChartProps {
  data: EngagementData[];
}

const EngagementChart: React.FC<EngagementChartProps> = ({ data }) => {
  // Calculate average engagement values
  const avgLikes = Math.round(
    data.reduce((sum, item) => sum + item.likes, 0) / data.length
  );
  const avgRetweets = Math.round(
    data.reduce((sum, item) => sum + item.retweets, 0) / data.length
  );
  const avgReplies = Math.round(
    data.reduce((sum, item) => sum + item.replies, 0) / data.length
  );
  const avgQuotes = Math.round(
    data.reduce((sum, item) => sum + item.quotes, 0) / data.length
  );

  // Find the tweet with the highest engagement
  const highestEngagement = data.reduce((highest, current) => {
    const currentTotal =
      current.likes + current.retweets + current.replies + current.quotes;
    const highestTotal =
      highest.likes + highest.retweets + highest.replies + highest.quotes;
    return currentTotal > highestTotal ? current : highest;
  }, data[0]);

  const highestEngagementTotal =
    highestEngagement.likes +
    highestEngagement.retweets +
    highestEngagement.replies +
    highestEngagement.quotes;

  return (
    <div className='space-y-8'>
      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          Engagement Metrics per Tweet
        </h3>
        <ResponsiveContainer width='100%' height='90%'>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='id'
              label={{
                value: 'Tweet Number',
                position: 'insideBottom',
                offset: -5,
              }}
            />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [value.toLocaleString(), '']}
              labelFormatter={(id) =>
                `Tweet #${id} (${data.find((d) => d.id === id)?.date || ''})`
              }
            />
            <Legend />
            <Bar dataKey='likes' fill='#8884d8' name='Likes' />
            <Bar dataKey='retweets' fill='#82ca9d' name='Retweets' />
            <Bar dataKey='replies' fill='#ffc658' name='Replies' />
            <Bar dataKey='quotes' fill='#ff8042' name='Quotes' />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>Engagement Rate (%)</h3>
        <ResponsiveContainer width='100%' height='90%'>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='id'
              label={{
                value: 'Tweet Number',
                position: 'insideBottom',
                offset: -5,
              }}
            />
            <YAxis />
            <Tooltip
              formatter={(value: number | string) => [
                typeof value === 'string' ? value : value.toFixed(2) + '%',
                'Engagement Rate',
              ]}
              labelFormatter={(id) =>
                `Tweet #${id} (${data.find((d) => d.id === id)?.date || ''})`
              }
            />
            <Legend />
            <Line
              type='monotone'
              dataKey='engagementRate'
              stroke='#ff7300'
              name='Engagement Rate (%)'
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-white p-4 rounded-lg shadow'>
          <h3 className='text-lg font-semibold mb-4'>Average Engagement</h3>
          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-purple-50 p-3 rounded text-center'>
              <div className='text-xl font-bold text-purple-600'>
                {avgLikes.toLocaleString()}
              </div>
              <div className='text-sm text-gray-500'>Avg. Likes</div>
            </div>
            <div className='bg-green-50 p-3 rounded text-center'>
              <div className='text-xl font-bold text-green-600'>
                {avgRetweets.toLocaleString()}
              </div>
              <div className='text-sm text-gray-500'>Avg. Retweets</div>
            </div>
            <div className='bg-yellow-50 p-3 rounded text-center'>
              <div className='text-xl font-bold text-yellow-600'>
                {avgReplies.toLocaleString()}
              </div>
              <div className='text-sm text-gray-500'>Avg. Replies</div>
            </div>
            <div className='bg-orange-50 p-3 rounded text-center'>
              <div className='text-xl font-bold text-orange-600'>
                {avgQuotes.toLocaleString()}
              </div>
              <div className='text-sm text-gray-500'>Avg. Quotes</div>
            </div>
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg shadow'>
          <h3 className='text-lg font-semibold mb-4'>Highest Engagement</h3>
          <div className='mb-3'>
            <div className='text-sm text-gray-500'>
              Tweet #{highestEngagement.id} ({highestEngagement.date})
            </div>
            <div className='text-xl font-bold text-indigo-600'>
              {highestEngagementTotal.toLocaleString()} total engagements
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-purple-50 p-2 rounded text-center'>
              <div className='text-lg font-bold text-purple-600'>
                {highestEngagement.likes.toLocaleString()}
              </div>
              <div className='text-xs text-gray-500'>Likes</div>
            </div>
            <div className='bg-green-50 p-2 rounded text-center'>
              <div className='text-lg font-bold text-green-600'>
                {highestEngagement.retweets.toLocaleString()}
              </div>
              <div className='text-xs text-gray-500'>Retweets</div>
            </div>
            <div className='bg-yellow-50 p-2 rounded text-center'>
              <div className='text-lg font-bold text-yellow-600'>
                {highestEngagement.replies.toLocaleString()}
              </div>
              <div className='text-xs text-gray-500'>Replies</div>
            </div>
            <div className='bg-orange-50 p-2 rounded text-center'>
              <div className='text-lg font-bold text-orange-600'>
                {highestEngagement.quotes.toLocaleString()}
              </div>
              <div className='text-xs text-gray-500'>Quotes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementChart;
