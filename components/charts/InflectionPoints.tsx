import React from 'react';
import { InflectionPoint } from '@/types';

interface InflectionPointsProps {
  data: InflectionPoint[];
}

const InflectionPoints: React.FC<InflectionPointsProps> = ({ data }) => {
  return (
    <div className='space-y-6'>
      <h3 className='text-lg font-semibold'>Key Inflection Points</h3>
      <p className='text-gray-600'>
        These are the critical moments that caused significant growth in your
        Twitter metrics. Understanding these inflection points can help you
        replicate success in the future.
      </p>

      <div className='relative py-6'>
        <div className='absolute top-0 bottom-0 left-12 w-0.5 bg-gray-200'></div>

        {data.map((point, index) => (
          <div key={index} className='relative mb-8'>
            <div className='absolute left-10 -translate-x-1/2 w-6 h-6 rounded-full bg-indigo-500 z-10 flex items-center justify-center text-white'>
              {index + 1}
            </div>
            <div className='ml-16 bg-white p-5 rounded-lg shadow-md border-l-4 border-indigo-500'>
              <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
                <h4 className='font-semibold text-lg mb-2 md:mb-0'>
                  {point.date}
                </h4>
                <div className='px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium'>
                  +{point.metrics.followerGain.toLocaleString()} followers
                </div>
              </div>

              <p className='text-gray-700 mt-2'>{point.description}</p>

              <div className='grid grid-cols-2 gap-4 mt-4'>
                <div className='bg-purple-50 p-3 rounded text-center'>
                  <div className='text-xl font-bold text-purple-600'>
                    {point.metrics.likes.toLocaleString()}
                  </div>
                  <div className='text-sm text-gray-500'>Likes</div>
                </div>
                <div className='bg-green-50 p-3 rounded text-center'>
                  <div className='text-xl font-bold text-green-600'>
                    {point.metrics.retweets.toLocaleString()}
                  </div>
                  <div className='text-sm text-gray-500'>Retweets</div>
                </div>
              </div>

              <div className='mt-4 p-3 bg-yellow-50 rounded border border-yellow-100'>
                <h5 className='font-medium text-yellow-800 mb-1'>
                  Key Insights
                </h5>
                <ul className='list-disc list-inside text-sm text-gray-700 space-y-1'>
                  <li>
                    Engagement to follower conversion rate:{' '}
                    {(
                      (point.metrics.followerGain /
                        (point.metrics.likes + point.metrics.retweets)) *
                      100
                    ).toFixed(1)}
                    %
                  </li>
                  <li>
                    Content type:{' '}
                    {point.description.toLowerCase().includes('thread')
                      ? 'Thread'
                      : 'Single Tweet'}
                  </li>
                  <li>
                    Virality quotient:{' '}
                    {(point.metrics.retweets / point.metrics.likes).toFixed(2)}
                  </li>
                </ul>
              </div>

              {index < data.length - 1 && (
                <div className='mt-4 pt-3 border-t border-gray-200'>
                  <h5 className='font-medium text-gray-700 mb-1'>
                    What to replicate:
                  </h5>
                  <p className='text-sm text-gray-600'>
                    {point.description.includes('story')
                      ? 'Personal stories create strong emotional connections. Continue sharing authentic experiences.'
                      : point.description.includes('controversial')
                      ? 'Thoughtful controversial opinions drive engagement. Find the right balance between provocative and valuable.'
                      : 'Educational content with actionable insights. Focus on practical value for your audience.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className='bg-white p-5 rounded-lg shadow border border-indigo-100'>
        <h4 className='font-semibold text-lg mb-3'>
          Growth Acceleration Strategy
        </h4>
        <p className='text-gray-700 mb-4'>
          Based on your inflection points, here are the key elements that drove
          your growth:
        </p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='bg-indigo-50 p-4 rounded'>
            <h5 className='font-medium text-indigo-800 mb-2'>Content Types</h5>
            <ul className='list-disc list-inside text-sm text-gray-700 space-y-1'>
              <li>
                {data[0].description.includes('thread')
                  ? 'Thread'
                  : 'Single Tweet'}
              </li>
              <li>
                {data[1].description.includes('thread')
                  ? 'Thread'
                  : 'Single Tweet'}
              </li>
              <li>
                {data[2].description.includes('thread')
                  ? 'Thread'
                  : 'Single Tweet'}
              </li>
            </ul>
          </div>

          <div className='bg-indigo-50 p-4 rounded'>
            <h5 className='font-medium text-indigo-800 mb-2'>
              Emotional Hooks
            </h5>
            <ul className='list-disc list-inside text-sm text-gray-700 space-y-1'>
              <li>
                {data[0].description.includes('personal')
                  ? 'Personal story'
                  : data[0].description.includes('controversial')
                  ? 'Controversy'
                  : 'Education'}
              </li>
              <li>
                {data[1].description.includes('personal')
                  ? 'Personal story'
                  : data[1].description.includes('controversial')
                  ? 'Controversy'
                  : 'Education'}
              </li>
              <li>
                {data[2].description.includes('personal')
                  ? 'Personal story'
                  : data[2].description.includes('controversial')
                  ? 'Controversy'
                  : 'Education'}
              </li>
            </ul>
          </div>

          <div className='bg-indigo-50 p-4 rounded'>
            <h5 className='font-medium text-indigo-800 mb-2'>Optimal Format</h5>
            <div className='text-sm text-gray-700'>
              <p>Based on your most successful content:</p>
              <p className='font-medium mt-2'>
                {data.some((p) => p.description.includes('thread'))
                  ? 'Threads with personal stories and actionable insights'
                  : 'Single tweets with controversial opinions or educational content'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InflectionPoints;
