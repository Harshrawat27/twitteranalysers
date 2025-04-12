import React from 'react';

interface InputFormProps {
  twitterUrl: string;
  setTwitterUrl: (url: string) => void;
  apifyApiKey: string;
  setApifyApiKey: (key: string) => void;
  openaiApiKey: string;
  setOpenaiApiKey: (key: string) => void;
  fetchTweets: () => Promise<void>;
  generateMockData: () => void;
  loading: boolean;
  error: string;
}

const InputForm: React.FC<InputFormProps> = ({
  twitterUrl,
  setTwitterUrl,
  apifyApiKey,
  setApifyApiKey,
  openaiApiKey,
  setOpenaiApiKey,
  fetchTweets,
  generateMockData,
  loading,
  error,
}) => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div>
          <label
            htmlFor='twitterUrl'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Twitter Profile URL
          </label>
          <input
            type='text'
            id='twitterUrl'
            className='w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500'
            placeholder='https://twitter.com/username or @username'
            value={twitterUrl}
            onChange={(e) => setTwitterUrl(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor='apifyApiKey'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Apify API Key
          </label>
          <input
            type='password'
            id='apifyApiKey'
            className='w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500'
            placeholder='Enter your Apify API key'
            value={apifyApiKey}
            onChange={(e) => setApifyApiKey(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor='openaiApiKey'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            OpenAI API Key
          </label>
          <input
            type='password'
            id='openaiApiKey'
            className='w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500'
            placeholder='Enter your OpenAI API key'
            value={openaiApiKey}
            onChange={(e) => setOpenaiApiKey(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      <div className='mt-6 flex flex-col sm:flex-row gap-4'>
        <button
          onClick={fetchTweets}
          disabled={loading || !twitterUrl || !apifyApiKey || !openaiApiKey}
          className='px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed'
        >
          {loading ? 'Processing...' : 'Analyze Profile'}
        </button>

        <button
          onClick={generateMockData}
          disabled={loading}
          className='px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
        >
          Load Demo Data
        </button>
      </div>

      {error && (
        <div className='mt-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200'>
          {error}
        </div>
      )}
    </div>
  );
};

export default InputForm;
