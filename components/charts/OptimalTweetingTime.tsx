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
  ComposedChart,
  Area,
} from 'recharts';
import { TimeData } from '@/types';

interface OptimalTweetingTimeProps {
  data: TimeData[];
}

const OptimalTweetingTime: React.FC<OptimalTweetingTimeProps> = ({ data }) => {
  // Format the hours in 12-hour format for display
  const formattedData = data.map((item) => ({
    ...item,
    formattedHour: `${item.hour % 12 === 0 ? 12 : item.hour % 12}${
      item.hour < 12 ? 'am' : 'pm'
    }`,
  }));

  // Find the hour with most tweets
  const mostTweetsHour = formattedData.reduce(
    (most, current) => (current.tweets > most.tweets ? current : most),
    formattedData[0]
  );

  // Find the hour with highest engagement
  const highestEngagementHour = formattedData.reduce(
    (highest, current) =>
      current.engagement > highest.engagement ? current : highest,
    formattedData[0]
  );

  // Calculate average engagement per tweet for each hour
  const engagementPerTweetData = formattedData.map((item) => ({
    ...item,
    engagementPerTweet: item.tweets > 0 ? item.engagement / item.tweets : 0,
  }));

  // Group data into time blocks for analysis
  const morningTweets = formattedData
    .filter((d) => d.hour >= 5 && d.hour < 12)
    .reduce((sum, item) => sum + item.tweets, 0);
  const afternoonTweets = formattedData
    .filter((d) => d.hour >= 12 && d.hour < 17)
    .reduce((sum, item) => sum + item.tweets, 0);
  const eveningTweets = formattedData
    .filter((d) => d.hour >= 17 && d.hour < 22)
    .reduce((sum, item) => sum + item.tweets, 0);
  const nightTweets = formattedData
    .filter((d) => d.hour >= 22 || d.hour < 5)
    .reduce((sum, item) => sum + item.tweets, 0);

  const totalTweets =
    morningTweets + afternoonTweets + eveningTweets + nightTweets;

  // Group engagement data into time blocks
  const morningEngagement =
    formattedData
      .filter((d) => d.hour >= 5 && d.hour < 12)
      .reduce((sum, item) => sum + item.tweets * item.engagement, 0) /
    (morningTweets || 1); // Avoid division by zero

  const afternoonEngagement =
    formattedData
      .filter((d) => d.hour >= 12 && d.hour < 17)
      .reduce((sum, item) => sum + item.tweets * item.engagement, 0) /
    (afternoonTweets || 1);

  const eveningEngagement =
    formattedData
      .filter((d) => d.hour >= 17 && d.hour < 22)
      .reduce((sum, item) => sum + item.tweets * item.engagement, 0) /
    (eveningTweets || 1);

  const nightEngagement =
    formattedData
      .filter((d) => d.hour >= 22 || d.hour < 5)
      .reduce((sum, item) => sum + item.tweets * item.engagement, 0) /
    (nightTweets || 1);

  return (
    <div className='space-y-8'>
      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          Engagement by Hour of Day
        </h3>
        <ResponsiveContainer width='100%' height='90%'>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='formattedHour'
              label={{
                value: 'Hour of day',
                position: 'insideBottom',
                offset: -5,
              }}
            />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [
                value.toLocaleString(),
                'Avg. Engagement',
              ]}
              labelFormatter={(hour) => `Time: ${hour}`}
            />
            <Legend />
            <Line
              type='monotone'
              dataKey='engagement'
              stroke='#8884d8'
              name='Average Engagement'
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>Tweets by Hour of Day</h3>
        <ResponsiveContainer width='100%' height='90%'>
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='formattedHour' />
            <YAxis />
            <Tooltip formatter={(value: number) => [value, 'Tweets']} />
            <Legend />
            <Bar
              dataKey='tweets'
              fill='#82ca9d'
              name='Number of Tweets'
              barSize={15}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          Engagement per Tweet by Hour
        </h3>
        <ResponsiveContainer width='100%' height='90%'>
          <ComposedChart data={engagementPerTweetData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='formattedHour' />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [
                value.toLocaleString(),
                'Engagement per Tweet',
              ]}
              labelFormatter={(hour) => `Time: ${hour}`}
            />
            <Legend />
            <Bar
              dataKey='tweets'
              fill='#82ca9d'
              name='Number of Tweets'
              barSize={15}
              opacity={0.3}
            />
            <Line
              type='monotone'
              dataKey='engagementPerTweet'
              stroke='#ff7300'
              name='Engagement per Tweet'
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 8 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className='bg-purple-50 p-5 rounded-lg border border-purple-100'>
        <h3 className='text-lg font-semibold mb-3'>Timing Analysis</h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h4 className='font-medium text-purple-800 mb-2'>
              Tweet Distribution
            </h4>
            <div className='space-y-2'>
              <div className='flex justify-between items-center'>
                <span className='text-gray-700'>Morning (5am-12pm):</span>
                <div className='flex items-center'>
                  <div className='w-48 bg-gray-200 rounded-full h-2.5 mr-2'>
                    <div
                      className='bg-purple-600 h-2.5 rounded-full'
                      style={{
                        width: `${(morningTweets / totalTweets) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className='text-gray-700 text-sm'>
                    {((morningTweets / totalTweets) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className='flex justify-between items-center'>
                <span className='text-gray-700'>Afternoon (12pm-5pm):</span>
                <div className='flex items-center'>
                  <div className='w-48 bg-gray-200 rounded-full h-2.5 mr-2'>
                    <div
                      className='bg-purple-600 h-2.5 rounded-full'
                      style={{
                        width: `${(afternoonTweets / totalTweets) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className='text-gray-700 text-sm'>
                    {((afternoonTweets / totalTweets) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className='flex justify-between items-center'>
                <span className='text-gray-700'>Evening (5pm-10pm):</span>
                <div className='flex items-center'>
                  <div className='w-48 bg-gray-200 rounded-full h-2.5 mr-2'>
                    <div
                      className='bg-purple-600 h-2.5 rounded-full'
                      style={{
                        width: `${(eveningTweets / totalTweets) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className='text-gray-700 text-sm'>
                    {((eveningTweets / totalTweets) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className='flex justify-between items-center'>
                <span className='text-gray-700'>Night (10pm-5am):</span>
                <div className='flex items-center'>
                  <div className='w-48 bg-gray-200 rounded-full h-2.5 mr-2'>
                    <div
                      className='bg-purple-600 h-2.5 rounded-full'
                      style={{ width: `${(nightTweets / totalTweets) * 100}%` }}
                    ></div>
                  </div>
                  <span className='text-gray-700 text-sm'>
                    {((nightTweets / totalTweets) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className='font-medium text-purple-800 mb-2'>Peak Times</h4>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Most active hour:</span>{' '}
              {mostTweetsHour.formattedHour}({mostTweetsHour.tweets} tweets)
            </p>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Highest engagement hour:</span>{' '}
              {highestEngagementHour.formattedHour}(
              {highestEngagementHour.engagement.toLocaleString()} avg.
              engagement)
            </p>
            <p className='text-gray-700'>
              <span className='font-medium'>Best time of day:</span>{' '}
              {
                [
                  { name: 'Morning', engagement: morningEngagement },
                  { name: 'Afternoon', engagement: afternoonEngagement },
                  { name: 'Evening', engagement: eveningEngagement },
                  { name: 'Night', engagement: nightEngagement },
                ].sort((a, b) => b.engagement - a.engagement)[0].name
              }{' '}
              has highest average engagement
            </p>
          </div>
        </div>

        <div className='mt-5 p-4 bg-white rounded border border-purple-100'>
          <h4 className='font-medium text-purple-800 mb-2'>
            Timing Optimization
          </h4>
          <ul className='list-disc list-inside space-y-1 text-gray-700'>
            <li>
              <span className='font-medium'>Recommended posting times:</span>{' '}
              {engagementPerTweetData
                .sort((a, b) => b.engagementPerTweet - a.engagementPerTweet)
                .slice(0, 3)
                .map((item) => item.formattedHour)
                .join(', ')}
            </li>
            <li>
              <span className='font-medium'>Schedule adjustment:</span>{' '}
              {mostTweetsHour.hour === highestEngagementHour.hour
                ? `Your current strategy of tweeting most at ${mostTweetsHour.formattedHour} aligns with engagement patterns`
                : `Consider shifting some tweets from ${mostTweetsHour.formattedHour} to ${highestEngagementHour.formattedHour} for better engagement`}
            </li>
            <li>
              <span className='font-medium'>Audience activity pattern:</span>{' '}
              {highestEngagementHour.hour >= 9 &&
              highestEngagementHour.hour <= 17
                ? 'Your audience engages most during business hours'
                : highestEngagementHour.hour >= 18 &&
                  highestEngagementHour.hour <= 23
                ? 'Your audience engages most during evening hours'
                : 'Your audience engages most during early morning hours'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OptimalTweetingTime;
