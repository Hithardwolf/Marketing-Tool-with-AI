import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';
import axios from 'axios';

export interface TwitterPost {
  id: string;
  text: string;
  url: string;
}

export interface TwitterAnalytics {
  tweetId: string;
  impressions: number;
  likes: number;
  retweets: number;
  replies: number;
  quotes: number;
}

@Injectable()
export class TwitterService {
  private client: TwitterApi;

  constructor() {
    const apiKey = process.env.TWITTER_API_KEY;
    const apiSecret = process.env.TWITTER_API_SECRET;
    const accessToken = process.env.TWITTER_ACCESS_TOKEN;
    const accessSecret = process.env.TWITTER_ACCESS_SECRET;

    if (!apiKey || !apiSecret || !accessToken || !accessSecret) {
      console.warn('⚠️  Twitter credentials not configured');
      return;
    }

    this.client = new TwitterApi({
      appKey: apiKey,
      appSecret: apiSecret,
      accessToken: accessToken,
      accessSecret: accessSecret,
    });
  }

  /**
   * Post to Twitter with image
   */
  async postTweet(imageUrl: string, text: string): Promise<TwitterPost> {
    try {
      if (!this.client) {
        throw new HttpException(
          'Twitter credentials not configured',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      console.log('🐦 Posting to Twitter...');

      // Step 1: Download image
      const imageResponse = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });
      const imageBuffer = Buffer.from(imageResponse.data);

      // Step 2: Upload image to Twitter
      const mediaId = await this.client.v1.uploadMedia(imageBuffer, {
        mimeType: 'image/png',
      });

      console.log('✅ Image uploaded:', mediaId);

      // Step 3: Post tweet with image
      const tweet = await this.client.v2.tweet({
        text: text,
        media: { media_ids: [mediaId] },
      });

      const tweetId = tweet.data.id;
      const tweetUrl = `https://twitter.com/i/web/status/${tweetId}`;

      console.log('✅ Tweet posted:', tweetUrl);

      return {
        id: tweetId,
        text: text,
        url: tweetUrl,
      };
    } catch (error: any) {
      console.error('❌ Twitter posting error:', error);
      throw new HttpException(
        `Twitter posting failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Get tweet analytics
   */
  async getTweetAnalytics(tweetId: string): Promise<TwitterAnalytics> {
    try {
      if (!this.client) {
        throw new HttpException(
          'Twitter credentials not configured',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      const tweet = await this.client.v2.singleTweet(tweetId, {
        'tweet.fields': ['public_metrics'],
      });

      const metrics = tweet.data.public_metrics;

      return {
        tweetId: tweetId,
        impressions: metrics?.impression_count || 0,
        likes: metrics?.like_count || 0,
        retweets: metrics?.retweet_count || 0,
        replies: metrics?.reply_count || 0,
        quotes: metrics?.quote_count || 0,
      };
    } catch (error: any) {
      console.error('❌ Twitter analytics error:', error);
      throw new HttpException(
        'Failed to fetch Twitter analytics',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Get recent tweets
   */
  async getRecentTweets(limit: number = 10): Promise<any[]> {
    try {
      if (!this.client) {
        throw new HttpException(
          'Twitter credentials not configured',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      const timeline = await this.client.v2.userTimeline('me', {
        max_results: limit,
        'tweet.fields': ['created_at', 'public_metrics'],
        'media.fields': ['url', 'preview_image_url'],
        expansions: ['attachments.media_keys'],
      });

      return timeline.data.data || [];
    } catch (error: any) {
      console.error('❌ Twitter fetch error:', error);
      throw new HttpException(
        'Failed to fetch tweets',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
