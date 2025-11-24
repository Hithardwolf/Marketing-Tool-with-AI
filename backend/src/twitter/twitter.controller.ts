import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TwitterService } from './twitter.service';

@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @Post('publish')
  async publishTweet(@Body() body: { imageUrl: string; text: string }) {
    try {
      if (!body.imageUrl || !body.text) {
        throw new HttpException(
          'Image URL and text are required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.twitterService.postTweet(
        body.imageUrl,
        body.text,
      );

      return {
        success: true,
        message: 'Posted to Twitter successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to publish to Twitter',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('analytics/:tweetId')
  async getAnalytics(@Param('tweetId') tweetId: string) {
    try {
      const analytics = await this.twitterService.getTweetAnalytics(tweetId);

      return {
        success: true,
        data: analytics,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch analytics',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('posts')
  async getRecentTweets() {
    try {
      const tweets = await this.twitterService.getRecentTweets(10);

      return {
        success: true,
        data: tweets,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch tweets',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
