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
  ComposedChart,
  Area,
} from 'recharts';
import { FrequencyData } from '@/types';

interface TweetingFrequencyProps {
  data: FrequencyData[];
}

const TweetingFrequency: React.FC<TweetingFrequencyProps> = ({ data }) => {
  // Reorder days of week properly
  const orderedDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const orderedData = [...data].sort(
    (a, b) => orderedDays.indexOf(a.day) - orderedDays.indexOf(b.day)
  );

  // Find the day with most tweets
  const mostTweetsDay = orderedData.reduce(
    (most, current) => (current.tweets > most.tweets ? current : most),
    orderedData[0]
  );

  // Find the day with highest engagement
  const highestEngagementDay = orderedData.reduce(
    (highest, current) =>
      current.engagement > highest.engagement ? current : highest,
    orderedData[0]
  );

  // Calculate total tweets
  const totalTweets = orderedData.reduce((sum, item) => sum + item.tweets, 0);

  // Calculate average tweets per day
  const avgTweetsPerDay = totalTweets / 7;

  // Create data for combined chart
  const combinedData = orderedData.map((item) => ({
    ...item,
    engagementPerTweet: item.tweets > 0 ? item.engagement / item.tweets : 0,
  }));

  return (
    <div className='space-y-8'>
      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>Tweets per Day of Week</h3>
        <ResponsiveContainer width='100%' height='90%'>
          <BarChart data={orderedData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='day' />
            <YAxis />
            <Tooltip formatter={(value: number) => [value, 'Tweets']} />
            <Legend />
            <Bar
              dataKey='tweets'
              fill='#8884d8'
              name='Number of Tweets'
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          Engagement by Day of Week
        </h3>
        <ResponsiveContainer width='100%' height='90%'>
          <BarChart data={orderedData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='day' />
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
              fill='#82ca9d'
              name='Average Engagement'
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          Tweet Frequency vs. Engagement per Tweet
        </h3>
        <ResponsiveContainer width='100%' height='90%'>
          <ComposedChart data={combinedData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='day' />
            <YAxis yAxisId='left' orientation='left' stroke='#8884d8' />
            <YAxis yAxisId='right' orientation='right' stroke='#82ca9d' />
            <Tooltip />
            <Legend />
            <Bar
              yAxisId='left'
              dataKey='tweets'
              fill='#8884d8'
              name='Number of Tweets'
              barSize={40}
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='engagementPerTweet'
              stroke='#82ca9d'
              name='Engagement per Tweet'
              strokeWidth={2}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className='bg-blue-50 p-5 rounded-lg border border-blue-100'>
        <h3 className='text-lg font-semibold mb-3'>Tweeting Patterns</h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h4 className='font-medium text-blue-800 mb-2'>
              Frequency Analysis
            </h4>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Busiest day:</span>{' '}
              {mostTweetsDay.day}({mostTweetsDay.tweets} tweets,{' '}
              {((mostTweetsDay.tweets / totalTweets) * 100).toFixed(1)}% of all
              tweets)
            </p>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Average tweets per day:</span>{' '}
              {avgTweetsPerDay.toFixed(1)}
            </p>
            <p className='text-gray-700'>
              <span className='font-medium'>Weekly consistency:</span>{' '}
              {Math.max(...orderedData.map((d) => d.tweets)) -
                Math.min(...orderedData.map((d) => d.tweets)) <
              3
                ? 'Very consistent tweeting pattern'
                : Math.max(...orderedData.map((d) => d.tweets)) -
                    Math.min(...orderedData.map((d) => d.tweets)) <
                  6
                ? 'Moderately consistent tweeting pattern'
                : 'Inconsistent tweeting pattern'}
            </p>
          </div>

          <div>
            <h4 className='font-medium text-blue-800 mb-2'>
              Engagement Patterns
            </h4>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Highest engagement day:</span>{' '}
              {highestEngagementDay.day}(
              {highestEngagementDay.engagement.toLocaleString()} avg.
              engagement)
            </p>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Best engagement per tweet:</span>{' '}
              {
                combinedData.reduce(
                  (best, current) =>
                    current.engagementPerTweet > best.engagementPerTweet
                      ? current
                      : best,
                  combinedData[0]
                ).day
              }
            </p>
            <p className='text-gray-700'>
              <span className='font-medium'>Weekday vs. Weekend ratio:</span>{' '}
              {(
                orderedData
                  .filter((d) => d.day !== 'Sat' && d.day !== 'Sun')
                  .reduce((sum, item) => sum + item.tweets, 0) /
                5 /
                (orderedData
                  .filter((d) => d.day === 'Sat' || d.day === 'Sun')
                  .reduce((sum, item) => sum + item.tweets, 0) /
                  2)
              ).toFixed(1)}
              x more tweets on weekdays
            </p>
          </div>
        </div>

        <div className='mt-5 p-4 bg-white rounded border border-blue-100'>
          <h4 className='font-medium text-blue-800 mb-2'>
            Frequency Optimization
          </h4>
          <ul className='list-disc list-inside space-y-1 text-gray-700'>
            <li>
              <span className='font-medium'>Optimal tweeting days:</span> Focus
              on {highestEngagementDay.day} and{' '}
              {
                orderedData
                  .filter((d) => d !== highestEngagementDay)
                  .reduce(
                    (best, current) =>
                      current.engagement > best.engagement ? current : best,
                    orderedData.filter((d) => d !== highestEngagementDay)[0]
                  ).day
              }
            </li>
            <li>
              <span className='font-medium'>Tweet redistribution:</span>{' '}
              {mostTweetsDay.day === highestEngagementDay.day
                ? `Your current strategy of tweeting most on ${mostTweetsDay.day} aligns with engagement patterns`
                : `Consider shifting some tweets from ${mostTweetsDay.day} to ${highestEngagementDay.day} for better engagement`}
            </li>
            <li>
              <span className='font-medium'>Recommended frequency:</span>{' '}
              {avgTweetsPerDay < 3
                ? 'Consider increasing your overall tweet frequency for better visibility'
                : avgTweetsPerDay > 10
                ? 'Your high tweet volume might be optimal for visibility, but watch for engagement fatigue'
                : 'Your current tweet frequency is in the optimal range for balancing visibility and engagement'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TweetingFrequency;
