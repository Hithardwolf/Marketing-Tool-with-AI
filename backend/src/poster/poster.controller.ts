import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DatabaseService, Poster } from '../database/db.service';

@Controller('posters')
export class PosterController {
  constructor(private readonly dbService: DatabaseService) {}

  @Post('generate')
  async generatePoster(
    @Body() body: { userId: number; prompt: string },
  ): Promise<Poster> {
    try {
      if (!body.userId || !body.prompt) {
        throw new HttpException(
          'User ID and prompt required',
          HttpStatus.BAD_REQUEST,
        );
      }

      console.log('Generating poster for prompt:', body.prompt);

      // Using Pollinations.ai - 100% FREE, NO API KEY NEEDED!
      const encodedPrompt = encodeURIComponent(body.prompt);
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&enhance=true`;

      const newPoster: Poster = {
        id: Date.now(),
        userId: body.userId,
        prompt: body.prompt,
        imageUrl: imageUrl,
        createdAt: new Date().toISOString(),
      };

      this.dbService.addPoster(newPoster);

      console.log('Poster generated successfully:', newPoster.id);

      return newPoster;
    } catch (error) {
      console.error('Error generating poster:', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Failed to generate poster',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('user/:userId')
  getUserPosters(@Param('userId') userId: string): Poster[] {
    const userIdNum = parseInt(userId, 10);
    if (isNaN(userIdNum)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
    return this.dbService.getUserPosters(userIdNum);
  }

  @Get()
  getAllPosters(): Poster[] {
    return this.dbService.getPosters();
  }
}
