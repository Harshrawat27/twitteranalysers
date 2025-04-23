'use client';

import { useState } from 'react';

export default function SeeTweets() {
  const [url, setUrl] = useState('');
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTweets = async () => {
    if (!url) {
      setError('Please enter a Twitter/X profile URL');
      return;
    }

    setLoading(true);
    setError(null);
    setTweets([]);

    try {
      let profileUrl = url;
      if (
        !url.startsWith('http') &&
        !url.includes('x.com/') &&
        !url.includes('twitter.com/')
      ) {
        profileUrl = `https://x.com/${url}`;
      }

      const response = await fetch('/api/fetch-tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profileUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch tweets');
      }

      setTweets(data.tweets || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching tweets:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='min-h-screen bg-gray-100 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>
          Twitter Profile Tweets
        </h1>

        <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
          <div className='flex gap-4'>
            <input
              type='text'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder='Enter Twitter/X profile URL or username'
              className='flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
              onClick={fetchTweets}
              disabled={loading}
              className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
            >
              {loading ? 'Loading...' : 'Fetch Tweets'}
            </button>
          </div>
        </div>

        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-8'>
            {error}
          </div>
        )}

        {tweets.length > 0 && (
          <div className='space-y-6'>
            {tweets.map((tweet) => (
              <div key={tweet.id} className='bg-white rounded-lg shadow-md p-6'>
                <div className='flex items-start gap-4'>
                  <img
                    src={tweet.author.profileImage}
                    alt={tweet.author.name}
                    className='w-12 h-12 rounded-full'
                  />
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-2'>
                      <span className='font-bold text-gray-900'>
                        {tweet.author.name}
                      </span>
                      <span className='text-gray-500'>
                        @{tweet.author.username}
                      </span>
                      <span className='text-gray-500'>·</span>
                      <span className='text-gray-500'>
                        {formatDate(tweet.createdAt)}
                      </span>
                    </div>
                    <p className='text-gray-800 mb-4'>{tweet.text}</p>
                    <div className='flex gap-6 text-gray-500'>
                      <span>❤️ {tweet.likes}</span>
                      <span>🔄 {tweet.retweets}</span>
                      <span>💬 {tweet.replies}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
