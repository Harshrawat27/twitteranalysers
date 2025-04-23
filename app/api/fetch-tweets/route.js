// app/api/fetch-tweets/route.js
import { NextResponse } from 'next/server';

// Export a named POST function (not a default export)
export async function POST(request) {
  try {
    // Get the Twitter profile URL from the request body
    const body = await request.json();
    const { profileUrl } = body;

    if (!profileUrl) {
      return NextResponse.json(
        { error: 'Profile URL is required' },
        { status: 400 }
      );
    }

    // Prepare the API request to Apify
    const apiEndpoint =
      'https://api.apify.com/v2/acts/kaitoeasyapi~twitter-x-data-tweet-scraper-pay-per-result-cheapest/run-sync-get-dataset-items';
    const apiToken = process.env.APIFY_API_TOKEN;

    if (!apiToken) {
      return NextResponse.json(
        { error: 'API token is not configured' },
        { status: 500 }
      );
    }

    console.log(`Fetching tweets for: ${profileUrl}`);

    // Make the API call to Apify
    const response = await fetch(`${apiEndpoint}?token=${apiToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        searchTerms: [profileUrl],
        tweetsDesired: 100, // Fetch 100 tweets
        mode: 'profile',
        maxTweets: 100, // Maximum number of tweets to fetch
        includeReplies: false, // Include replies
        includeRetweets: false, // Include retweets
        language: 'en', // Filter by English tweets
        sort: 'oldest', // Get oldest tweets first
      }),
      signal: AbortSignal.timeout(60000), // 60 second timeout
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`API error: ${response.status}`, errorData);
      return NextResponse.json(
        {
          error: `API request failed with status ${response.status}`,
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Process and format the tweets
    const formattedTweets = data.map((tweet) => ({
      id: tweet.id,
      text: tweet.text,
      createdAt: tweet.createdAt,
      likes: tweet.likes,
      retweets: tweet.retweets,
      replies: tweet.replies,
      author: {
        name: tweet.author?.name,
        username: tweet.author?.username,
        profileImage: tweet.author?.profileImage,
      },
    }));

    return NextResponse.json({ tweets: formattedTweets });
  } catch (error) {
    console.error('Error fetching tweets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tweets', details: error.message },
      { status: 500 }
    );
  }
}
