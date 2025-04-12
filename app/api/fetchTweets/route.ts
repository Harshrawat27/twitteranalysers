import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, apifyApiKey } = body;

    if (!username || !apifyApiKey) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Get Twitter profile information first
    const profileData = await fetchTwitterProfile(username, apifyApiKey);

    // Then get tweets for the profile
    const tweets = await fetchTweets(username, apifyApiKey);

    return NextResponse.json({
      profile: profileData,
      tweets: tweets,
    });
  } catch (error) {
    console.error('Error fetching tweets:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to fetch tweets',
      },
      { status: 500 }
    );
  }
}

async function fetchTwitterProfile(username: string, apiKey: string) {
  // Start Apify task for scraping profile info
  const startResponse = await fetch(
    'https://api.apify.com/v2/actor-tasks/username~twitterer-scraper/run-sync-get-dataset-items',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        handle: username,
        maxTweets: 1,
        proxyConfiguration: {
          useApifyProxy: true,
        },
      }),
    }
  );

  if (!startResponse.ok) {
    throw new Error(
      `Failed to fetch profile data: ${startResponse.statusText}`
    );
  }

  const profileItems = await startResponse.json();

  if (!profileItems || profileItems.length === 0) {
    throw new Error(`No profile found for @${username}`);
  }

  // Format profile data for our application
  const rawProfile = profileItems[0];
  return {
    id: rawProfile.userId,
    username: rawProfile.handle,
    name: rawProfile.displayName,
    followers_count: rawProfile.followersCount,
    following_count: rawProfile.followingCount,
    tweet_count: rawProfile.statusesCount,
    profile_image_url: rawProfile.profileImageUrl,
    description: rawProfile.description,
  };
}

async function fetchTweets(username: string, apiKey: string) {
  // Start Apify task for scraping tweets
  const startResponse = await fetch(
    'https://api.apify.com/v2/actor-tasks/dtrungtin~twitter-scraper/run-sync-get-dataset-items',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        searchTerms: [`from:${username}`],
        maxTweets: 10000,
        proxyConfiguration: {
          useApifyProxy: true,
        },
      }),
    }
  );

  if (!startResponse.ok) {
    throw new Error(`Failed to fetch tweets: ${startResponse.statusText}`);
  }

  const tweetItems = await startResponse.json();

  // Format tweets for our application
  return tweetItems.map((tweet: any) => ({
    id: tweet.id,
    text: tweet.full_text || tweet.text,
    created_at: tweet.created_at,
    public_metrics: {
      retweet_count: tweet.retweet_count || 0,
      reply_count: tweet.reply_count || 0,
      like_count: tweet.favorite_count || 0,
      quote_count: tweet.quote_count || 0,
    },
    entities: {
      hashtags: (tweet.entities?.hashtags || []).map((h: any) => ({
        tag: h.text,
      })),
      mentions: (tweet.entities?.user_mentions || []).map((m: any) => ({
        username: m.screen_name,
      })),
      urls: (tweet.entities?.urls || []).map((u: any) => ({
        url: u.expanded_url,
      })),
    },
  }));
}
