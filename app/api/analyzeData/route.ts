import { NextResponse } from 'next/server';
import { Tweet, TwitterProfile, AnalysisResults } from '@/types';
import { format } from 'date-fns';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tweets, profile, openaiApiKey } = body;

    if (!tweets || !profile || !openaiApiKey) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Perform the analysis
    const analysisResults = await analyzeTwitterData(
      tweets,
      profile,
      openaiApiKey
    );

    return NextResponse.json(analysisResults);
  } catch (error) {
    console.error('Error analyzing data:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to analyze data',
      },
      { status: 500 }
    );
  }
}

async function analyzeTwitterData(
  tweets: Tweet[],
  profile: TwitterProfile,
  apiKey: string
): Promise<AnalysisResults> {
  try {
    // We'll use OpenAI for some of the analysis
    // For this demo, we'll still use a lot of client-side processing first

    // Sort tweets by creation date (newest first)
    const sortedTweets = [...tweets].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // Calculate follower growth (simulate with fake data for this example)
    // In a real implementation, you'd need historical data or use OpenAI to estimate
    const followerGrowth = generateFollowerGrowthData(sortedTweets);

    // Calculate engagement per tweet
    const engagementPerTweet = calculateEngagementPerTweet(
      sortedTweets,
      profile.followers_count
    );

    // Analyze content performance using OpenAI
    const contentAndTopicData = await analyzeContentAndTopics(
      sortedTweets,
      apiKey
    );

    // Calculate tweeting frequency
    const tweetingFrequency = calculateTweetingFrequency(sortedTweets);

    // Determine optimal tweeting time
    const optimalTweetingTime = calculateOptimalTweetingTime(sortedTweets);

    // Calculate audience quality metrics
    const audienceQuality = generateAudienceQualityData(sortedTweets);

    // Calculate virality quotient
    const viralityQuotient = calculateViralityQuotient(sortedTweets);

    // Analyze emotions and psychological hooks using OpenAI
    const emotionAndHookData = await analyzeEmotionsAndHooks(
      sortedTweets,
      apiKey
    );

    // Identify inflection points
    const inflectionPoints = identifyInflectionPoints(
      sortedTweets,
      followerGrowth
    );

    return {
      followerGrowth,
      engagementPerTweet,
      contentPerformance: contentAndTopicData.contentPerformance,
      topicAnalysis: contentAndTopicData.topicAnalysis,
      tweetingFrequency,
      optimalTweetingTime,
      audienceQuality,
      viralityQuotient,
      emotionAnalysis: emotionAndHookData.emotionAnalysis,
      psychologicalHooks: emotionAndHookData.psychologicalHooks,
      inflectionPoints,
    };
  } catch (error) {
    console.error('Error in analysis:', error);
    throw new Error('Failed to analyze Twitter data');
  }
}

// Helper functions for analysis
function generateFollowerGrowthData(tweets: Tweet[]) {
  // This would normally use historical data or AI prediction
  // For demo purposes, we'll generate mock data
  const today = new Date();
  const data = [];

  let baseLine = 50000; // Starting follower count

  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    // Random daily change with slight upward trend
    const dailyChange =
      Math.floor(Math.random() * 400) - 50 + (i < 15 ? 100 : 0);

    baseLine += dailyChange;

    data.push({
      day: format(date, 'MM/dd'),
      followers: baseLine,
      dailyChange: dailyChange,
    });
  }

  return data;
}

function calculateEngagementPerTweet(tweets: Tweet[], followerCount: number) {
  return tweets.slice(0, 50).map((tweet, index) => {
    const totalEngagement =
      tweet.public_metrics.like_count +
      tweet.public_metrics.retweet_count +
      tweet.public_metrics.reply_count +
      tweet.public_metrics.quote_count;

    const engagementRate = ((totalEngagement / followerCount) * 100).toFixed(2);

    return {
      id: index,
      date: format(new Date(tweet.created_at), 'MM/dd'),
      likes: tweet.public_metrics.like_count,
      retweets: tweet.public_metrics.retweet_count,
      replies: tweet.public_metrics.reply_count,
      quotes: tweet.public_metrics.quote_count,
      engagementRate,
    };
  });
}

async function analyzeContentAndTopics(tweets: Tweet[], apiKey: string) {
  // For a real implementation, you'd use OpenAI to analyze the content and topics
  // For this demo, we'll use mock data

  // In production, you'd send tweet text to OpenAI API for analysis

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'Analyze the following tweets and categorize them by content type and topic.',
        },
        {
          role: 'user',
          content: JSON.stringify(tweets.slice(0, 100).map((t) => t.text)),
        },
      ],
    }),
  });

  const data = await response.json();
  // Process the response...

  // Mock content performance data
  const contentPerformance = [
    { type: 'Text-only', value: 45, engagement: 2300 },
    { type: 'Image', value: 30, engagement: 3500 },
    { type: 'Video', value: 15, engagement: 5200 },
    { type: 'Thread', value: 8, engagement: 4100 },
    { type: 'Poll', value: 2, engagement: 1800 },
  ];

  // Mock topic analysis data
  const topicAnalysis = [
    { topic: 'Technology', count: 35, avgEngagement: 2800 },
    { topic: 'Business', count: 25, avgEngagement: 3100 },
    { topic: 'Personal', count: 20, avgEngagement: 4500 },
    { topic: 'News', count: 15, avgEngagement: 1900 },
    { topic: 'Other', count: 5, avgEngagement: 1200 },
  ];

  return { contentPerformance, topicAnalysis };
}

function calculateTweetingFrequency(tweets: Tweet[]) {
  const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayCount = [0, 0, 0, 0, 0, 0, 0];
  const dayEngagement = [0, 0, 0, 0, 0, 0, 0];

  tweets.forEach((tweet) => {
    const date = new Date(tweet.created_at);
    const dayIndex = date.getDay();

    dayCount[dayIndex]++;

    const tweetEngagement =
      tweet.public_metrics.like_count +
      tweet.public_metrics.retweet_count +
      tweet.public_metrics.reply_count +
      tweet.public_metrics.quote_count;

    dayEngagement[dayIndex] += tweetEngagement;
  });

  return dayMap.map((day, index) => ({
    day,
    tweets: dayCount[index],
    engagement:
      dayCount[index] > 0
        ? Math.round(dayEngagement[index] / dayCount[index])
        : 0,
  }));
}

function calculateOptimalTweetingTime(tweets: Tweet[]) {
  const hourCounts = Array(24).fill(0);
  const hourEngagements = Array(24).fill(0);

  tweets.forEach((tweet) => {
    const date = new Date(tweet.created_at);
    const hour = date.getHours();

    hourCounts[hour]++;

    const tweetEngagement =
      tweet.public_metrics.like_count +
      tweet.public_metrics.retweet_count +
      tweet.public_metrics.reply_count +
      tweet.public_metrics.quote_count;

    hourEngagements[hour] += tweetEngagement;
  });

  return Array.from({ length: 24 }, (_, hour) => ({
    hour,
    tweets: hourCounts[hour],
    engagement:
      hourCounts[hour] > 0
        ? Math.round(hourEngagements[hour] / hourCounts[hour])
        : 0,
  }));
}

function generateAudienceQualityData(tweets: Tweet[]) {
  // This would normally use historical data or AI prediction
  // For demo purposes, we'll generate mock data
  const today = new Date();
  const data = [];

  let baseRatio = 50; // Starting followers-to-following ratio
  let baseInfluential = 2500; // Starting influential followers count

  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    // Small random changes
    const ratioChange = Math.random() * 0.4 - 0.1;
    const influentialChange = Math.floor(Math.random() * 60) - 20;

    baseRatio += ratioChange;
    baseInfluential += influentialChange;

    data.push({
      day: format(date, 'MM/dd'),
      ratio: baseRatio.toFixed(2),
      influentialFollowers: Math.round(baseInfluential),
    });
  }

  return data;
}

function calculateViralityQuotient(tweets: Tweet[]) {
  return tweets.slice(0, 30).map((tweet, index) => {
    const virality =
      (tweet.public_metrics.retweet_count + tweet.public_metrics.quote_count) /
      (tweet.public_metrics.like_count || 1);

    return {
      id: index,
      date: format(new Date(tweet.created_at), 'MM/dd'),
      text: tweet.text.substring(0, 30) + (tweet.text.length > 30 ? '...' : ''),
      virality: parseFloat(virality.toFixed(2)),
      retweets: tweet.public_metrics.retweet_count,
      quotes: tweet.public_metrics.quote_count,
    };
  });
}

async function analyzeEmotionsAndHooks(tweets: Tweet[], apiKey: string) {
  // For a real implementation, you'd use OpenAI to analyze the emotions and hooks
  // For this demo, we'll use mock data

  // In production, you'd send tweet text to OpenAI API for analysis

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'Analyze the following tweets and identify the emotions and psychological hooks used.',
        },
        {
          role: 'user',
          content: JSON.stringify(tweets.slice(0, 100).map((t) => t.text)),
        },
      ],
    }),
  });

  const data = await response.json();
  // Process the response...

  // Mock emotion analysis data
  const emotionAnalysis = [
    { emotion: 'Humor', count: 30, engagement: 4200 },
    { emotion: 'Curiosity', count: 25, engagement: 3800 },
    { emotion: 'Inspiration', count: 20, engagement: 4500 },
    { emotion: 'Surprise', count: 15, engagement: 3200 },
    { emotion: 'Anger', count: 10, engagement: 3900 },
  ];

  // Mock psychological hooks data
  const psychologicalHooks = [
    { hook: 'Call-to-Action', count: 25, engagement: 3200 },
    { hook: 'Controversial', count: 15, engagement: 4800 },
    { hook: 'Personal Story', count: 30, engagement: 4100 },
    { hook: 'Question', count: 20, engagement: 2900 },
    { hook: 'Educational', count: 10, engagement: 2500 },
  ];

  return { emotionAnalysis, psychologicalHooks };
}

function identifyInflectionPoints(tweets: Tweet[], followerGrowth: any[]) {
  // Find tweets with exceptionally high engagement
  const sortedByEngagement = [...tweets].sort((a, b) => {
    const engagementA =
      a.public_metrics.like_count +
      a.public_metrics.retweet_count +
      a.public_metrics.reply_count +
      a.public_metrics.quote_count;

    const engagementB =
      b.public_metrics.like_count +
      b.public_metrics.retweet_count +
      b.public_metrics.reply_count +
      b.public_metrics.quote_count;

    return engagementB - engagementA;
  });

  // Get the top 3 most engaging tweets
  const topTweets = sortedByEngagement.slice(0, 3);

  // For demonstration purposes, we'll create inflection points based on these top tweets
  return topTweets.map((tweet) => {
    const date = format(new Date(tweet.created_at), 'MM/dd');

    // Create a description based on the tweet content
    const text = tweet.text.toLowerCase();
    let description = 'Viral tweet';

    if (text.includes('tech') || text.includes('technology')) {
      description = 'Major viral tweet about technology trends';
    } else if (text.includes('business') || text.includes('advice')) {
      description = 'Thread on business advice went viral';
    } else if (text.includes('personal') || text.includes('story')) {
      description = 'Personal story resonated with audience';
    }

    return {
      date,
      description,
      metrics: {
        likes: tweet.public_metrics.like_count,
        retweets: tweet.public_metrics.retweet_count,
        followerGain: Math.round(tweet.public_metrics.like_count * 0.2), // Simulate follower gain
      },
    };
  });
}
