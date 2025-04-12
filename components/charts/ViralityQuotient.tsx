import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LabelList,
} from 'recharts';
import { ViralityData } from '@/types';

interface ViralityQuotientProps {
  data: ViralityData[];
}

const ViralityQuotient: React.FC<ViralityQuotientProps> = ({ data }) => {
  // Sort data by virality (highest first)
  const sortedData = [...data].sort((a, b) => b.virality - a.virality);

  // Get top 10 most viral tweets
  const top10Viral = sortedData.slice(0, 10);

  // Format data for scatter chart
  const scatterData = data.map((item) => ({
    ...item,
    // Size will be proportional to virality
    z: item.virality * 10,
  }));

  // Calculate average virality
  const avgVirality =
    data.reduce((sum, item) => sum + item.virality, 0) / data.length;

  // Find tweet with highest virality
  const highestVirality = sortedData[0];

  // Custom tooltip for the ScatterChart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className='bg-white p-3 border border-gray-200 shadow-md rounded-md'>
          <p className='font-medium text-gray-700'>
            Tweet #{data.id} ({data.date})
          </p>
          <p className='text-sm text-gray-600 mb-2'>"{data.text}"</p>
          <div className='grid grid-cols-2 gap-2 text-xs'>
            <div>
              <span className='font-medium text-gray-700'>Virality:</span>{' '}
              {data.virality.toFixed(2)}
            </div>
            <div>
              <span className='font-medium text-gray-700'>Retweets:</span>{' '}
              {data.retweets.toLocaleString()}
            </div>
            <div>
              <span className='font-medium text-gray-700'>Quotes:</span>{' '}
              {data.quotes.toLocaleString()}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='space-y-8'>
      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          Virality Quotient by Tweet
        </h3>
        <ResponsiveContainer width='100%' height='90%'>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis
              dataKey='id'
              name='Tweet ID'
              type='number'
              label={{
                value: 'Tweet Number',
                position: 'insideBottom',
                offset: -5,
              }}
            />
            <YAxis
              dataKey='virality'
              name='Virality Quotient'
              label={{
                value: 'Virality Quotient',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <ZAxis dataKey='z' range={[50, 400]} name='Size' />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Scatter
              name='Tweets'
              data={scatterData}
              fill='#8884d8'
              shape='circle'
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>Top 10 Most Viral Tweets</h3>
        <ResponsiveContainer width='100%' height='90%'>
          <BarChart
            data={top10Viral}
            layout='vertical'
            margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis type='number' />
            <YAxis
              dataKey='id'
              type='category'
              tickFormatter={(value) => `#${value}`}
            />
            <Tooltip
              formatter={(value: number) => [
                value.toFixed(2),
                'Virality Quotient',
              ]}
              labelFormatter={(id) =>
                `Tweet #${id} (${
                  top10Viral.find((t) => t.id === id)?.date || ''
                })`
              }
            />
            <Legend />
            <Bar dataKey='virality' name='Virality Quotient' fill='#8884d8'>
              {top10Viral.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? '#ff7300' : '#8884d8'}
                />
              ))}
              <LabelList
                dataKey='text'
                position='right'
                formatter={(value: string) =>
                  value.length > 20 ? value.substring(0, 20) + '...' : value
                }
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className='bg-orange-50 p-5 rounded-lg border border-orange-100'>
        <h3 className='text-lg font-semibold mb-3'>Virality Analysis</h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h4 className='font-medium text-orange-800 mb-2'>Key Metrics</h4>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Average virality quotient:</span>{' '}
              {avgVirality.toFixed(2)}
            </p>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Highest virality:</span>{' '}
              {highestVirality.virality.toFixed(2)}
              (Tweet #{highestVirality.id}, {highestVirality.date})
            </p>
            <p className='text-gray-700'>
              <span className='font-medium'>Virality distribution:</span>{' '}
              {(data.filter((t) => t.virality > 1).length / data.length) * 100 <
              10
                ? 'Very few of your tweets achieve virality (virality quotient > 1)'
                : (data.filter((t) => t.virality > 1).length / data.length) *
                    100 <
                  30
                ? 'A moderate portion of your tweets achieve virality'
                : 'Many of your tweets achieve good virality'}
            </p>
          </div>

          <div>
            <h4 className='font-medium text-orange-800 mb-2'>
              Most Viral Tweet
            </h4>
            <div className='bg-white p-3 rounded-md border border-orange-200 mb-3'>
              <p className='text-sm text-gray-600 mb-1'>
                <span className='text-xs font-medium text-gray-500'>
                  Tweet #{highestVirality.id} • {highestVirality.date}
                </span>
              </p>
              <p className='text-gray-800 mb-2'>"{highestVirality.text}"</p>
              <div className='grid grid-cols-3 gap-2 text-center'>
                <div className='bg-orange-50 rounded p-1'>
                  <div className='text-lg font-bold text-orange-600'>
                    {highestVirality.virality.toFixed(2)}
                  </div>
                  <div className='text-xs text-gray-500'>Virality</div>
                </div>
                <div className='bg-green-50 rounded p-1'>
                  <div className='text-lg font-bold text-green-600'>
                    {highestVirality.retweets.toLocaleString()}
                  </div>
                  <div className='text-xs text-gray-500'>Retweets</div>
                </div>
                <div className='bg-blue-50 rounded p-1'>
                  <div className='text-lg font-bold text-blue-600'>
                    {highestVirality.quotes.toLocaleString()}
                  </div>
                  <div className='text-xs text-gray-500'>Quotes</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-5 p-4 bg-white rounded border border-orange-100'>
          <h4 className='font-medium text-orange-800 mb-2'>
            Virality Patterns
          </h4>
          <div className='space-y-3'>
            <div>
              <h5 className='text-sm font-medium text-gray-700'>
                What makes your content go viral?
              </h5>
              <ul className='list-disc list-inside text-gray-700 space-y-1 mt-2'>
                <li>
                  <span className='font-medium'>Content type:</span>{' '}
                  {top10Viral.some(
                    (t) => t.text.includes('thread') || t.text.includes('🧵')
                  )
                    ? 'Threads perform exceptionally well for virality'
                    : top10Viral.some((t) => t.text.includes('?'))
                    ? 'Questions that engage your audience drive sharing'
                    : 'Direct, punchy statements tend to get shared more'}
                </li>
                <li>
                  <span className='font-medium'>Emotional drivers:</span>{' '}
                  {top10Viral.some(
                    (t) =>
                      t.text.toLowerCase().includes('controversial') ||
                      t.text.toLowerCase().includes('unpopular') ||
                      t.text.toLowerCase().includes('hot take')
                  )
                    ? 'Controversial opinions generate high sharing rates'
                    : top10Viral.some(
                        (t) =>
                          t.text.toLowerCase().includes('tip') ||
                          t.text.toLowerCase().includes('how to') ||
                          t.text.toLowerCase().includes('learn')
                      )
                    ? 'Educational content drives strong sharing behavior'
                    : 'Personal stories and experiences resonate with your audience'}
                </li>
                <li>
                  <span className='font-medium'>Timing pattern:</span>{' '}
                  {
                    // Simple check for date patterns in top viral tweets
                    new Set(top10Viral.map((t) => t.date.split('/')[1])).size <
                    top10Viral.length / 2
                      ? 'Your viral content tends to cluster around specific days of the month'
                      : 'Your viral content is spread throughout different days, suggesting content is more important than timing'
                  }
                </li>
              </ul>
            </div>

            <div className='mt-3'>
              <h5 className='text-sm font-medium text-gray-700'>
                Virality Quality Score
              </h5>
              <div className='relative pt-1'>
                <div className='overflow-hidden h-2 text-xs flex rounded bg-gray-200'>
                  <div
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                      avgVirality < 0.5
                        ? 'bg-red-500'
                        : avgVirality < 1
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{
                      width: `${Math.min(avgVirality * 50, 100)}%`,
                    }}
                  ></div>
                </div>
                <div className='flex justify-between text-xs text-gray-600 mt-1'>
                  <span>Low (0-0.5)</span>
                  <span>High (2.0+)</span>
                </div>
              </div>
              <p className='text-sm mt-1 text-gray-600'>
                {avgVirality < 0.5
                  ? "Your content doesn't get shared much relative to likes. Focus on creating more shareable content."
                  : avgVirality < 1
                  ? "Decent sharing rates. You're creating content people find worth sharing, but there's room to improve."
                  : 'Excellent virality! Your content gets shared extensively, giving you great exposure beyond your direct followers.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViralityQuotient;
