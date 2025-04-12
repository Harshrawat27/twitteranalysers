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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { EmotionData } from '@/types';

interface EmotionAnalysisProps {
  data: EmotionData[];
}

const COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff8042',
  '#0088FE',
  '#FF8042',
  '#00C49F',
];

// Map emotions to color codes for more intuitive representation
const EMOTION_COLORS: Record<string, string> = {
  Humor: '#FFD166', // Yellow
  Curiosity: '#06D6A0', // Green
  Inspiration: '#118AB2', // Blue
  Surprise: '#7209B7', // Purple
  Anger: '#EF476F', // Red
  Controversy: '#E63946', // Dark Red
  Sadness: '#4361EE', // Blue
  Joy: '#FF9E00', // Orange
  Fear: '#9D4EDD', // Purple
  Hope: '#73D2DE', // Light Blue
};

const EmotionAnalysis: React.FC<EmotionAnalysisProps> = ({ data }) => {
  // Sort data by count (highest first)
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  // Find the emotion with highest count
  const mostCommonEmotion = sortedData[0];

  // Find the emotion with highest engagement
  const mostEngagingEmotion = data.reduce(
    (most, current) => (current.engagement > most.engagement ? current : most),
    data[0]
  );

  // Calculate total
  const totalEmotions = data.reduce((sum, item) => sum + item.count, 0);

  // Format data for radar chart
  const radarData = data.map((item) => ({
    emotion: item.emotion,
    count: Math.round((item.count / totalEmotions) * 100),
    engagement: Math.round(item.engagement / 100),
  }));

  return (
    <div className='space-y-8'>
      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          Emotion Distribution in Tweets
        </h3>
        <ResponsiveContainer width='100%' height='90%'>
          <PieChart>
            <Pie
              data={data}
              dataKey='count'
              nameKey='emotion'
              cx='50%'
              cy='50%'
              outerRadius={120}
              fill='#8884d8'
              label={({ emotion, percent }) =>
                `${emotion}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    EMOTION_COLORS[entry.emotion] ||
                    COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [
                `${value} tweets (${((value / totalEmotions) * 100).toFixed(
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
        <h3 className='text-lg font-semibold mb-4'>Emotion vs. Engagement</h3>
        <ResponsiveContainer width='100%' height='90%'>
          <BarChart data={sortedData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='emotion' />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [
                value.toLocaleString(),
                'Avg. Engagement',
              ]}
            />
            <Legend />
            <Bar dataKey='engagement' name='Average Engagement' barSize={40}>
              {sortedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    EMOTION_COLORS[entry.emotion] ||
                    COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          Emotional Dimension Analysis
        </h3>
        <ResponsiveContainer width='100%' height='90%'>
          <RadarChart outerRadius={120} data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey='emotion' />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name='Frequency (%)'
              dataKey='count'
              stroke='#8884d8'
              fill='#8884d8'
              fillOpacity={0.5}
            />
            <Radar
              name='Engagement (scaled)'
              dataKey='engagement'
              stroke='#82ca9d'
              fill='#82ca9d'
              fillOpacity={0.5}
            />
            <Legend />
            <Tooltip formatter={(value: number) => [value.toFixed(0), '']} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className='bg-pink-50 p-5 rounded-lg border border-pink-100'>
        <h3 className='text-lg font-semibold mb-3'>
          Emotional Impact Analysis
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h4 className='font-medium text-pink-800 mb-2'>
              Emotion Frequency
            </h4>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Most common emotion:</span>{' '}
              {mostCommonEmotion.emotion}({mostCommonEmotion.count} tweets,{' '}
              {((mostCommonEmotion.count / totalEmotions) * 100).toFixed(1)}% of
              content)
            </p>
            <div className='mt-4'>
              <h5 className='font-medium text-pink-700 mb-1'>
                Emotional Range
              </h5>
              <div className='flex flex-wrap gap-2'>
                {sortedData.map((item, index) => (
                  <div
                    key={index}
                    className='px-2 py-1 rounded-full text-xs font-semibold'
                    style={{
                      backgroundColor: `${
                        EMOTION_COLORS[item.emotion] ||
                        COLORS[index % COLORS.length]
                      }20`,
                      color:
                        EMOTION_COLORS[item.emotion] ||
                        COLORS[index % COLORS.length],
                      border: `1px solid ${
                        EMOTION_COLORS[item.emotion] ||
                        COLORS[index % COLORS.length]
                      }`,
                    }}
                  >
                    {item.emotion}:{' '}
                    {((item.count / totalEmotions) * 100).toFixed(0)}%
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className='font-medium text-pink-800 mb-2'>
              Engagement Impact
            </h4>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Most engaging emotion:</span>{' '}
              {mostEngagingEmotion.emotion}(
              {mostEngagingEmotion.engagement.toLocaleString()} avg. engagement)
            </p>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Least engaging emotion:</span>{' '}
              {
                data.reduce(
                  (least, current) =>
                    current.engagement < least.engagement ? current : least,
                  data[0]
                ).emotion
              }
            </p>
            <p className='text-gray-700'>
              <span className='font-medium'>Engagement ratio:</span>{' '}
              {(
                mostEngagingEmotion.engagement /
                data.reduce(
                  (least, current) =>
                    current.engagement < least.engagement ? current : least,
                  data[0]
                ).engagement
              ).toFixed(1)}
              x difference between best and worst
            </p>
          </div>
        </div>

        <div className='mt-5 p-4 bg-white rounded border border-pink-100'>
          <h4 className='font-medium text-pink-800 mb-2'>Emotional Strategy</h4>
          <div className='space-y-3'>
            <div>
              <h5 className='text-sm font-medium text-gray-700'>
                Content Emotional Balance
              </h5>
              <p className='text-gray-600 mt-1'>
                {sortedData[0].count / totalEmotions > 0.5
                  ? `Your content is heavily dominated by ${
                      sortedData[0].emotion
                    } (${((sortedData[0].count / totalEmotions) * 100).toFixed(
                      0
                    )}%). Consider diversifying your emotional range for broader appeal.`
                  : sortedData[0].count / totalEmotions > 0.35
                  ? `Your content shows a strong preference for ${
                      sortedData[0].emotion
                    } (${((sortedData[0].count / totalEmotions) * 100).toFixed(
                      0
                    )}%), with some emotional variety.`
                  : `You maintain a good balance of emotional tones in your content, with no single emotion dominating.`}
              </p>
            </div>

            <div className='mt-3'>
              <h5 className='text-sm font-medium text-gray-700'>
                Emotional Engagement Strategy
              </h5>
              <ul className='list-disc list-inside text-gray-700 space-y-1 mt-2'>
                <li>
                  <span className='font-medium'>Focus on:</span>{' '}
                  {mostEngagingEmotion.emotion} content drives
                  {(
                    (mostEngagingEmotion.engagement /
                      (data.reduce((sum, item) => sum + item.engagement, 0) /
                        data.length)) *
                      100 -
                    100
                  ).toFixed(0)}
                  % higher engagement than average
                </li>
                <li>
                  <span className='font-medium'>Emotional alignment:</span>{' '}
                  {mostCommonEmotion.emotion === mostEngagingEmotion.emotion
                    ? `Your most common emotion (${mostCommonEmotion.emotion}) aligns perfectly with your most engaging emotion`
                    : `Consider shifting focus from ${mostCommonEmotion.emotion} toward ${mostEngagingEmotion.emotion} for better engagement`}
                </li>
                <li>
                  <span className='font-medium'>Emotional diversity:</span>{' '}
                  {data.length < 4
                    ? 'Your emotional range is limited. Experimenting with a wider range of emotional tones could help you discover new engagement opportunities'
                    : 'You have a good diversity of emotional tones in your content, which helps appeal to different audience segments'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionAnalysis;
