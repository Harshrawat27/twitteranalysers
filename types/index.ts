// Twitter data types
export interface Tweet {
  id: string;
  text: string;
  created_at: string;
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
    impression_count?: number;
  };
  entities?: {
    hashtags?: { tag: string }[];
    mentions?: { username: string }[];
    urls?: { url: string }[];
  };
}

export interface TwitterProfile {
  id: string;
  username: string;
  name: string;
  followers_count: number;
  following_count: number;
  tweet_count: number;
  profile_image_url: string;
  description?: string;
}

// Analysis results types
export interface FollowerGrowthData {
  day: string;
  followers: number;
  dailyChange: number;
}

export interface EngagementData {
  id: number;
  date: string;
  likes: number;
  retweets: number;
  replies: number;
  quotes: number;
  engagementRate: string | number;
}

export interface ContentTypeData {
  type: string;
  value: number;
  engagement: number;
}

export interface TopicData {
  topic: string;
  count: number;
  avgEngagement: number;
}

export interface FrequencyData {
  day: string;
  tweets: number;
  engagement: number;
}

export interface TimeData {
  hour: number;
  tweets: number;
  engagement: number;
}

export interface AudienceQualityData {
  day: string;
  ratio: string | number;
  influentialFollowers: number;
}

export interface ViralityData {
  id: number;
  date: string;
  text: string;
  virality: number;
  retweets: number;
  quotes: number;
}

export interface EmotionData {
  emotion: string;
  count: number;
  engagement: number;
}

export interface HookData {
  hook: string;
  count: number;
  engagement: number;
}

export interface InflectionPoint {
  date: string;
  description: string;
  metrics: {
    likes: number;
    retweets: number;
    followerGain: number;
  };
}

export interface AnalysisResults {
  followerGrowth: FollowerGrowthData[];
  engagementPerTweet: EngagementData[];
  contentPerformance: ContentTypeData[];
  topicAnalysis: TopicData[];
  tweetingFrequency: FrequencyData[];
  optimalTweetingTime: TimeData[];
  audienceQuality: AudienceQualityData[];
  viralityQuotient: ViralityData[];
  emotionAnalysis: EmotionData[];
  psychologicalHooks: HookData[];
  inflectionPoints: InflectionPoint[];
}
