import React, { useState } from 'react';
import { AnalysisResults } from '@/types';
import FollowerGrowth from './charts/FollowerGrowth';
import EngagementChart from './charts/EngagementChart';
import ContentPerformance from './charts/ContentPerformance';
import TopicAnalysis from './charts/TopicAnalysis';
import TweetingFrequency from './charts/TweetingFrequency';
import OptimalTweetingTime from './charts/OptimalTweetingTime';
import AudienceQuality from './charts/AudienceQuality';
import ViralityQuotient from './charts/ViralityQuotient';
import EmotionAnalysis from './charts/EmotionAnalysis';
import PsychologicalHooks from './charts/PsychologicalHooks';
import InflectionPoints from './charts/InflectionPoints';

interface DashboardProps {
  analysis: AnalysisResults;
}

const Dashboard: React.FC<DashboardProps> = ({ analysis }) => {
  const [activeTab, setActiveTab] = useState('followerGrowth');

  const tabs = [
    { id: 'followerGrowth', label: 'Follower Growth' },
    { id: 'engagementPerTweet', label: 'Engagement' },
    { id: 'contentPerformance', label: 'Content Format' },
    { id: 'topicAnalysis', label: 'Topic Analysis' },
    { id: 'tweetingFrequency', label: 'Tweeting Frequency' },
    { id: 'optimalTweetingTime', label: 'Optimal Timing' },
    { id: 'audienceQuality', label: 'Audience Quality' },
    { id: 'viralityQuotient', label: 'Virality' },
    { id: 'emotionAnalysis', label: 'Emotion Analysis' },
    { id: 'psychologicalHooks', label: 'Psychological Hooks' },
    { id: 'inflectionPoints', label: 'Inflection Points' },
  ];

  const renderChart = () => {
    switch (activeTab) {
      case 'followerGrowth':
        return <FollowerGrowth data={analysis.followerGrowth} />;
      case 'engagementPerTweet':
        return <EngagementChart data={analysis.engagementPerTweet} />;
      case 'contentPerformance':
        return <ContentPerformance data={analysis.contentPerformance} />;
      case 'topicAnalysis':
        return <TopicAnalysis data={analysis.topicAnalysis} />;
      case 'tweetingFrequency':
        return <TweetingFrequency data={analysis.tweetingFrequency} />;
      case 'optimalTweetingTime':
        return <OptimalTweetingTime data={analysis.optimalTweetingTime} />;
      case 'audienceQuality':
        return <AudienceQuality data={analysis.audienceQuality} />;
      case 'viralityQuotient':
        return <ViralityQuotient data={analysis.viralityQuotient} />;
      case 'emotionAnalysis':
        return <EmotionAnalysis data={analysis.emotionAnalysis} />;
      case 'psychologicalHooks':
        return <PsychologicalHooks data={analysis.psychologicalHooks} />;
      case 'inflectionPoints':
        return <InflectionPoints data={analysis.inflectionPoints} />;
      default:
        return <div>Select a category to view analysis</div>;
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-md'>
      <div className='border-b border-gray-200'>
        <nav className='flex overflow-x-auto py-4 px-4'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-md mr-2 ${
                activeTab === tab.id
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className='p-6'>{renderChart()}</div>
    </div>
  );
};

export default Dashboard;
