'use client';

import { useState } from 'react';
import { Inter } from 'next/font/google';
import Dashboard from '@/components/Dashboard';
import InputForm from '@/components/InputForm';
import ProfileHeader from '@/components/ProfileHeader';
import LoadingState from '@/components/LoadingState';
import { TwitterProfile, Tweet, AnalysisResults } from '@/types';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [twitterUrl, setTwitterUrl] = useState('');
  const [apifyApiKey, setApifyApiKey] = useState('');
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [profile, setProfile] = useState<TwitterProfile | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Extract username from Twitter URL
  // Extract username from Twitter URL
  const extractUsername = (url: string) => {
    try {
      // If it's already a username with @ prefix
      if (url.startsWith('@')) {
        return url.substring(1);
      }

      // If it's just a username without @ or URL
      if (!url.includes('/') && !url.includes('.')) {
        return url;
      }

      // Try to parse as URL
      const urlObj = new URL(url);
      const pathSegments = urlObj.pathname
        .split('/')
        .filter((segment) => segment);
      return pathSegments[0];
    } catch (error) {
      // If URL parsing fails, check common URL patterns
      const twitterUrlMatch =
        url.match(/twitter\.com\/([^\/\?]+)/i) ||
        url.match(/x\.com\/([^\/\?]+)/i);
      if (twitterUrlMatch && twitterUrlMatch[1]) {
        return twitterUrlMatch[1];
      }

      // Last resort, just return the input if it doesn't have special characters
      if (!/[\s\/\?&=]/.test(url)) {
        return url;
      }

      return '';
    }
  };

  // Fetch tweets using Apify API
  const fetchTweets = async () => {
    setLoading(true);
    setError('');
    try {
      const username = extractUsername(twitterUrl);
      if (!username) {
        throw new Error('Invalid Twitter URL or username');
      }

      // Normally this would be an API route to protect your API keys
      const response = await fetch('/api/fetchTweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          apifyApiKey,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch tweets: ${response.statusText}`);
      }

      const data = await response.json();
      setTweets(data.tweets);
      setProfile(data.profile);

      // After getting tweets, analyze them
      if (data.tweets.length > 0) {
        await analyzeData(data.tweets, data.profile);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  // Analyze the tweet data with OpenAI
  const analyzeData = async (
    tweetData: Tweet[],
    profileData: TwitterProfile
  ) => {
    try {
      const response = await fetch('/api/analyzeData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tweets: tweetData,
          profile: profileData,
          openaiApiKey,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to analyze data: ${response.statusText}`);
      }

      const analysisResults = await response.json();
      setAnalysis(analysisResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    }
  };

  // Generate mock data for preview purposes
  const generateMockData = () => {
    const mockData = require('@/utils/mockData');
    setProfile(mockData.profile);
    setTweets(mockData.tweets);
    setAnalysis(mockData.analysis);
  };

  return (
    <main className={`min-h-screen bg-gray-100 p-6 ${inter.className}`}>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8 text-center'>
          Twitter Profile Analyzer
        </h1>

        <InputForm
          twitterUrl={twitterUrl}
          setTwitterUrl={setTwitterUrl}
          apifyApiKey={apifyApiKey}
          setApifyApiKey={setApifyApiKey}
          openaiApiKey={openaiApiKey}
          setOpenaiApiKey={setOpenaiApiKey}
          fetchTweets={fetchTweets}
          generateMockData={generateMockData}
          loading={loading}
          error={error}
        />

        {loading && <LoadingState />}

        {profile && !loading && (
          <ProfileHeader profile={profile} tweetCount={tweets.length} />
        )}

        {analysis && !loading && <Dashboard analysis={analysis} />}
      </div>
    </main>
  );
}
