import { Tweet, TwitterProfile, AnalysisResults } from '@/types';
import { format } from 'date-fns';

// Mock Twitter Profile
export const profile: TwitterProfile = {
  id: '12345',
  username: 'growthmaster',
  name: 'Growth Master',
  followers_count: 50000,
  following_count: 1000,
  tweet_count: 5000,
  profile_image_url: 'https://via.placeholder.com/150',
  description:
    'Helping creators grow on Twitter | Growth strategy expert | Building in public',
};

// Generate mock tweets
export const tweets: Tweet[] = Array.from({ length: 100 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);

  const topics = [
    'Just published my latest growth strategy. Check it out! #growthhacking',
    "Here's how I gained 10k followers in 30 days: a thread 🧵",
    "The secret to viral content isn't what you think. Let me explain...",
    'My biggest Twitter mistakes and what I learned from them:',
    "Question for creators: what's your biggest challenge right now?",
    'BREAKING: Major tech company just announced a new feature for creators!',
    'Today I hit a new milestone. Thank you to all my amazing followers!',
    'Personal story time: how I went from 0 to 50k followers in a year',
    "Hot take: most Twitter advice is actually counterproductive. Here's why:",
    'Pro tip: The best time to tweet is when YOUR audience is online.',
  ];

  return {
    id: `tweet-${i}`,
    text: topics[i % topics.length],
    created_at: date.toISOString(),
    public_metrics: {
      retweet_count: Math.floor(Math.random() * 1000),
      reply_count: Math.floor(Math.random() * 500),
      like_count: Math.floor(Math.random() * 5000),
      quote_count: Math.floor(Math.random() * 200),
    },
    entities: {
      hashtags: [{ tag: 'growthhacking' }, { tag: 'twitterstrategy' }],
      mentions: [{ username: 'someuser' }],
      urls: [{ url: 'https://example.com' }],
    },
  };
});

// Generate mock analysis data
export const analysis: AnalysisResults = {
  followerGrowth: Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      day: format(date, 'MM/dd'),
      followers: 50000 - (29 - i) * 200 + Math.floor(Math.random() * 100),
      dailyChange: Math.floor(Math.random() * 400 - 100),
    };
  }),

  engagementPerTweet: Array.from({ length: 50 }, (_, i) => ({
    id: i,
    date: format(
      new Date(new Date().setDate(new Date().getDate() - i)),
      'MM/dd'
    ),
    likes: Math.floor(Math.random() * 3000) + 500,
    retweets: Math.floor(Math.random() * 500) + 50,
    replies: Math.floor(Math.random() * 300) + 20,
    quotes: Math.floor(Math.random() * 100) + 10,
    engagementRate: (Math.random() * 5 + 1).toFixed(2),
  })),

  contentPerformance: [
    { type: 'Text-only', value: 45, engagement: 2300 },
    { type: 'Image', value: 30, engagement: 3500 },
    { type: 'Video', value: 15, engagement: 5200 },
    { type: 'Thread', value: 8, engagement: 4100 },
    { type: 'Poll', value: 2, engagement: 1800 },
  ],

  topicAnalysis: [
    { topic: 'Growth Strategies', count: 35, avgEngagement: 3800 },
    { topic: 'Personal Stories', count: 25, avgEngagement: 4500 },
    { topic: 'Twitter Tips', count: 20, avgEngagement: 3100 },
    { topic: 'Industry News', count: 15, avgEngagement: 2200 },
    { topic: 'Q&A/Polls', count: 5, avgEngagement: 2900 },
  ],

  tweetingFrequency: Array.from({ length: 7 }, (_, i) => ({
    day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
    tweets: Math.floor(Math.random() * 10) + 5,
    engagement: Math.floor(Math.random() * 5000) + 1000,
  })),

  optimalTweetingTime: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    tweets: Math.floor(Math.random() * 5) + 1,
    engagement: Math.floor(Math.random() * 3000) + 500,
  })),

  audienceQuality: Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      day: format(date, 'MM/dd'),
      ratio: (50 - (29 - i) * 0.1 + Math.random() * 0.5).toFixed(2),
      influentialFollowers: 2500 + i * 20 + Math.floor(Math.random() * 50),
    };
  }),

  viralityQuotient: Array.from({ length: 30 }, (_, i) => {
    const topics = [
      'Growth strategy thread 🧵',
      'How to get more followers:',
      'My biggest Twitter mistake',
      'Why consistency matters',
      'Personal milestone achieved!',
      'Hot take on creator economy',
      'Question for my audience',
      'Industry news and analysis',
      'Quick tip for growth',
      'Controversial opinion:',
    ];

    return {
      id: i,
      date: format(
        new Date(new Date().setDate(new Date().getDate() - i)),
        'MM/dd'
      ),
      text: topics[i % topics.length],
      virality: parseFloat((Math.random() * 3 + 0.5).toFixed(2)),
      retweets: Math.floor(Math.random() * 800) + 100,
      quotes: Math.floor(Math.random() * 200) + 50,
    };
  }),

  emotionAnalysis: [
    { emotion: 'Curiosity', count: 30, engagement: 4100 },
    { emotion: 'Inspiration', count: 25, engagement: 4500 },
    { emotion: 'Humor', count: 20, engagement: 3800 },
    { emotion: 'Surprise', count: 15, engagement: 3600 },
    { emotion: 'Controversy', count: 10, engagement: 5200 },
  ],

  psychologicalHooks: [
    { hook: 'Personal Story', count: 30, engagement: 4300 },
    { hook: 'Call-to-Action', count: 25, engagement: 3200 },
    { hook: 'Question', count: 20, engagement: 3500 },
    { hook: 'Controversial Opinion', count: 15, engagement: 4800 },
    { hook: 'Educational Content', count: 10, engagement: 3800 },
  ],

  inflectionPoints: [
    {
      date: format(
        new Date(new Date().setDate(new Date().getDate() - 25)),
        'MM/dd'
      ),
      description: 'Viral thread on growth strategies',
      metrics: {
        likes: 8650,
        retweets: 3240,
        followerGain: 1850,
      },
    },
    {
      date: format(
        new Date(new Date().setDate(new Date().getDate() - 18)),
        'MM/dd'
      ),
      description: 'Personal story about Twitter journey',
      metrics: {
        likes: 12200,
        retweets: 4800,
        followerGain: 2200,
      },
    },
    {
      date: format(
        new Date(new Date().setDate(new Date().getDate() - 10)),
        'MM/dd'
      ),
      description: 'Controversial take on creator economy',
      metrics: {
        likes: 15800,
        retweets: 6500,
        followerGain: 3100,
      },
    },
  ],
};
