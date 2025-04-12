import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className='bg-white p-8 rounded-lg shadow-md mb-8'>
      <div className='flex flex-col items-center justify-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mb-4'></div>
        <h3 className='text-lg font-medium text-gray-700'>
          Processing Twitter Data
        </h3>
        <p className='text-gray-500 text-center mt-2'>
          This might take a few minutes. We're fetching tweets and running AI
          analysis on the data.
        </p>
        <div className='w-full max-w-md bg-gray-200 rounded-full h-2.5 mt-6'>
          <div className='bg-indigo-600 h-2.5 rounded-full animate-pulse w-3/4'></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
