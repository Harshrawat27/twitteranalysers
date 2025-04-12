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
  AreaChart,
  Area,
} from 'recharts';
import { AudienceQualityData } from '@/types';

interface AudienceQualityProps {
  data: AudienceQualityData[];
}

const AudienceQuality: React.FC<AudienceQualityProps> = ({ data }) => {
  // Calculate the growth trends
  const startRatio = parseFloat(data[0].ratio.toString());
  const endRatio = parseFloat(data[data.length - 1].ratio.toString());
  const ratioGrowth = ((endRatio - startRatio) / startRatio) * 100;

  const startInfluential = data[0].influentialFollowers;
  const endInfluential = data[data.length - 1].influentialFollowers;
  const influentialGrowth =
    ((endInfluential - startInfluential) / startInfluential) * 100;

  // Find the day with highest ratio change
  let highestRatioChangeDay = data[0];
  let highestRatioDiff = 0;

  for (let i = 1; i < data.length; i++) {
    const prevRatio = parseFloat(data[i - 1].ratio.toString());
    const currRatio = parseFloat(data[i].ratio.toString());
    const diff = Math.abs(currRatio - prevRatio);

    if (diff > highestRatioDiff) {
      highestRatioDiff = diff;
      highestRatioChangeDay = data[i];
    }
  }

  // Find the day with highest influential followers change
  let highestInfluentialChangeDay = data[0];
  let highestInfluentialDiff = 0;

  for (let i = 1; i < data.length; i++) {
    const prevInfluential = data[i - 1].influentialFollowers;
    const currInfluential = data[i].influentialFollowers;
    const diff = Math.abs(currInfluential - prevInfluential);

    if (diff > highestInfluentialDiff) {
      highestInfluentialDiff = diff;
      highestInfluentialChangeDay = data[i];
    }
  }

  return (
    <div className='space-y-8'>
      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          Followers-to-Following Ratio
        </h3>
        <ResponsiveContainer width='100%' height='90%'>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='day' />
            <YAxis />
            <Tooltip
              formatter={(value: string | number) => [
                typeof value === 'string'
                  ? parseFloat(value).toFixed(2)
                  : value.toFixed(2),
                'Ratio',
              ]}
              labelFormatter={(day) => `Date: ${day}`}
            />
            <Legend />
            <Line
              type='monotone'
              dataKey='ratio'
              stroke='#8884d8'
              name='Followers-to-Following Ratio'
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          Influential Followers Growth
        </h3>
        <ResponsiveContainer width='100%' height='90%'>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='day' />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [
                value.toLocaleString(),
                'Influential Followers',
              ]}
              labelFormatter={(day) => `Date: ${day}`}
            />
            <Legend />
            <Area
              type='monotone'
              dataKey='influentialFollowers'
              name='Influential Followers'
              stroke='#82ca9d'
              fill='#82ca9d'
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className='bg-indigo-50 p-5 rounded-lg border border-indigo-100'>
        <h3 className='text-lg font-semibold mb-3'>
          Audience Quality Insights
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h4 className='font-medium text-indigo-800 mb-2'>Ratio Analysis</h4>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Current ratio:</span>{' '}
              {parseFloat(data[data.length - 1].ratio.toString()).toFixed(2)}{' '}
              followers per following
            </p>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Ratio change:</span>
              <span
                className={
                  ratioGrowth >= 0 ? 'text-green-600 ml-1' : 'text-red-600 ml-1'
                }
              >
                {ratioGrowth >= 0 ? '+' : ''}
                {ratioGrowth.toFixed(1)}%
              </span>
            </p>
            <p className='text-gray-700'>
              <span className='font-medium'>Highest change day:</span>{' '}
              {highestRatioChangeDay.day}
              (changed by {highestRatioDiff.toFixed(2)})
            </p>
          </div>

          <div>
            <h4 className='font-medium text-indigo-800 mb-2'>
              Influential Followers
            </h4>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Current count:</span>{' '}
              {data[data.length - 1].influentialFollowers.toLocaleString()}{' '}
              influential followers
            </p>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Growth:</span>
              <span
                className={
                  influentialGrowth >= 0
                    ? 'text-green-600 ml-1'
                    : 'text-red-600 ml-1'
                }
              >
                {influentialGrowth >= 0 ? '+' : ''}
                {influentialGrowth.toFixed(1)}%
              </span>
            </p>
            <p className='text-gray-700'>
              <span className='font-medium'>Highest growth day:</span>{' '}
              {highestInfluentialChangeDay.day}
              (changed by {highestInfluentialDiff.toLocaleString()})
            </p>
          </div>
        </div>

        <div className='mt-5 p-4 bg-white rounded border border-indigo-100'>
          <h4 className='font-medium text-indigo-800 mb-2'>
            Audience Quality Assessment
          </h4>
          <div className='space-y-4'>
            <div>
              <h5 className='text-sm font-medium text-gray-700'>
                Follower-to-Following Ratio
              </h5>
              <div className='relative pt-1'>
                <div className='overflow-hidden h-2 text-xs flex rounded bg-gray-200'>
                  <div
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                      parseFloat(data[data.length - 1].ratio.toString()) < 1
                        ? 'bg-red-500'
                        : parseFloat(data[data.length - 1].ratio.toString()) < 5
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{
                      width: `${Math.min(
                        parseFloat(data[data.length - 1].ratio.toString()) * 10,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className='flex justify-between text-xs text-gray-600 mt-1'>
                  <span>Poor (0-1)</span>
                  <span>Good (5+)</span>
                </div>
              </div>
              <p className='text-sm mt-1 text-gray-600'>
                {parseFloat(data[data.length - 1].ratio.toString()) < 1
                  ? "You're following more accounts than follow you. This can signal a less engaged audience."
                  : parseFloat(data[data.length - 1].ratio.toString()) < 5
                  ? 'Your ratio is healthy but could be improved. Focus on organic growth.'
                  : 'Excellent ratio! This suggests your content attracts followers without needing to follow back.'}
              </p>
            </div>

            <div>
              <h5 className='text-sm font-medium text-gray-700'>
                Influential Follower Growth
              </h5>
              <div className='relative pt-1'>
                <div className='overflow-hidden h-2 text-xs flex rounded bg-gray-200'>
                  <div
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                      influentialGrowth < 0
                        ? 'bg-red-500'
                        : influentialGrowth < 10
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{
                      width: `${Math.min(
                        Math.max(influentialGrowth, 0) * 3,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className='flex justify-between text-xs text-gray-600 mt-1'>
                  <span>Declining</span>
                  <span>Strong Growth (30%+)</span>
                </div>
              </div>
              <p className='text-sm mt-1 text-gray-600'>
                {influentialGrowth < 0
                  ? "You're losing influential followers. Consider engaging more with industry leaders."
                  : influentialGrowth < 10
                  ? 'Modest growth in influential followers. Try creating more shareable content for wider reach.'
                  : 'Strong growth in influential followers! Your content is attracting attention from users with significant reach.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudienceQuality;
