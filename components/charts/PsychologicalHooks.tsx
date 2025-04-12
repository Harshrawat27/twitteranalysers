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
import { HookData } from '@/types';

interface PsychologicalHooksProps {
  data: HookData[];
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

// Map hooks to color codes for more intuitive representation
const HOOK_COLORS: Record<string, string> = {
  'Call-to-Action': '#06D6A0', // Green
  Controversial: '#EF476F', // Red
  'Personal Story': '#118AB2', // Blue
  Question: '#FFD166', // Yellow
  Educational: '#7209B7', // Purple
  'Curiosity Gap': '#FF9E00', // Orange
  'Social Proof': '#4361EE', // Blue
  FOMO: '#E63946', // Dark Red
  Urgency: '#9D4EDD', // Purple
  'Value Proposition': '#73D2DE', // Light Blue
};

const PsychologicalHooks: React.FC<PsychologicalHooksProps> = ({ data }) => {
  // Sort data by count (highest first)
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  // Find the hook with highest count
  const mostCommonHook = sortedData[0];

  // Find the hook with highest engagement
  const mostEngagingHook = data.reduce(
    (most, current) => (current.engagement > most.engagement ? current : most),
    data[0]
  );

  // Calculate total
  const totalHooks = data.reduce((sum, item) => sum + item.count, 0);

  // Format data for radar chart - normalize to percentages
  const radarData = data.map((item) => ({
    hook: item.hook,
    count: Math.round((item.count / totalHooks) * 100),
    engagement: Math.round(item.engagement / 100),
  }));

  return (
    <div className='space-y-8'>
      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          Psychological Hooks Distribution
        </h3>
        <ResponsiveContainer width='100%' height='90%'>
          <PieChart>
            <Pie
              data={data}
              dataKey='count'
              nameKey='hook'
              cx='50%'
              cy='50%'
              outerRadius={120}
              fill='#8884d8'
              label={({ hook, percent }) =>
                `${hook}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    HOOK_COLORS[entry.hook] || COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [
                `${value} tweets (${((value / totalHooks) * 100).toFixed(1)}%)`,
                'Count',
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>Hooks vs. Engagement</h3>
        <ResponsiveContainer width='100%' height='90%'>
          <BarChart data={sortedData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='hook' />
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
                    HOOK_COLORS[entry.hook] || COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className='h-96 bg-white p-4 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>Hook Patterns Analysis</h3>
        <ResponsiveContainer width='100%' height='90%'>
          <RadarChart outerRadius={120} data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey='hook' />
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

      <div className='bg-teal-50 p-5 rounded-lg border border-teal-100'>
        <h3 className='text-lg font-semibold mb-3'>
          Psychological Hook Impact
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h4 className='font-medium text-teal-800 mb-2'>Hook Frequency</h4>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Most common hook:</span>{' '}
              {mostCommonHook.hook}({mostCommonHook.count} tweets,{' '}
              {((mostCommonHook.count / totalHooks) * 100).toFixed(1)}% of
              content)
            </p>
            <div className='mt-4'>
              <h5 className='font-medium text-teal-700 mb-1'>Hook Variety</h5>
              <div className='flex flex-wrap gap-2'>
                {sortedData.map((item, index) => (
                  <div
                    key={index}
                    className='px-2 py-1 rounded-full text-xs font-semibold'
                    style={{
                      backgroundColor: `${
                        HOOK_COLORS[item.hook] || COLORS[index % COLORS.length]
                      }20`,
                      color:
                        HOOK_COLORS[item.hook] || COLORS[index % COLORS.length],
                      border: `1px solid ${
                        HOOK_COLORS[item.hook] || COLORS[index % COLORS.length]
                      }`,
                    }}
                  >
                    {item.hook}: {((item.count / totalHooks) * 100).toFixed(0)}%
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className='font-medium text-teal-800 mb-2'>
              Hook Effectiveness
            </h4>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Most engaging hook:</span>{' '}
              {mostEngagingHook.hook}(
              {mostEngagingHook.engagement.toLocaleString()} avg. engagement)
            </p>
            <p className='mb-2 text-gray-700'>
              <span className='font-medium'>Least engaging hook:</span>{' '}
              {
                data.reduce(
                  (least, current) =>
                    current.engagement < least.engagement ? current : least,
                  data[0]
                ).hook
              }
            </p>
            <p className='text-gray-700'>
              <span className='font-medium'>Engagement ratio:</span>{' '}
              {(
                mostEngagingHook.engagement /
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

        <div className='mt-5 p-4 bg-white rounded border border-teal-100'>
          <h4 className='font-medium text-teal-800 mb-2'>
            Optimal Hook Strategy
          </h4>
          <div className='space-y-3'>
            <div>
              <h5 className='text-sm font-medium text-gray-700'>
                Hook Balance Assessment
              </h5>
              <p className='text-gray-600 mt-1'>
                {sortedData[0].count / totalHooks > 0.5
                  ? `Your content is heavily dominated by ${
                      sortedData[0].hook
                    } (${((sortedData[0].count / totalHooks) * 100).toFixed(
                      0
                    )}%). A more balanced approach with different psychological hooks might yield better results.`
                  : sortedData[0].count / totalHooks > 0.35
                  ? `Your content shows a strong preference for ${
                      sortedData[0].hook
                    } (${((sortedData[0].count / totalHooks) * 100).toFixed(
                      0
                    )}%), with some variety in psychological approaches.`
                  : `You maintain a good balance of psychological hooks in your content, which helps engage different audience motivations.`}
              </p>
            </div>

            <div className='mt-3'>
              <h5 className='text-sm font-medium text-gray-700'>
                Strategic Recommendations
              </h5>
              <ul className='list-disc list-inside text-gray-700 space-y-1 mt-2'>
                <li>
                  <span className='font-medium'>Primary hook:</span>{' '}
                  {mostEngagingHook.hook} content drives
                  {(
                    (mostEngagingHook.engagement /
                      (data.reduce((sum, item) => sum + item.engagement, 0) /
                        data.length)) *
                      100 -
                    100
                  ).toFixed(0)}
                  % higher engagement than average
                </li>
                <li>
                  <span className='font-medium'>Hook alignment:</span>{' '}
                  {mostCommonHook.hook === mostEngagingHook.hook
                    ? `Your most common hook (${mostCommonHook.hook}) aligns perfectly with your most engaging hook`
                    : `Consider shifting focus from ${mostCommonHook.hook} toward ${mostEngagingHook.hook} for better engagement`}
                </li>
                <li>
                  <span className='font-medium'>Hook combinations:</span> Try
                  combining {mostEngagingHook.hook} with{' '}
                  {
                    data
                      .filter((h) => h.hook !== mostEngagingHook.hook)
                      .reduce(
                        (best, current) =>
                          current.engagement > best.engagement ? current : best,
                        data.filter((h) => h.hook !== mostEngagingHook.hook)[0]
                      ).hook
                  }{' '}
                  for potentially even stronger engagement
                </li>
                <li>
                  <span className='font-medium'>Unexplored opportunities:</span>{' '}
                  {data.length < 4
                    ? 'Your psychological hook range is limited. Experiment with hooks like curiosity gaps, social proof, or urgency to expand your engagement toolkit.'
                    : "You're already using a good variety of psychological hooks. Focus on optimizing the most effective ones."}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychologicalHooks;
