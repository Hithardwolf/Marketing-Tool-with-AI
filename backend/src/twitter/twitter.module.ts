import { Module } from '@nestjs/common';
import { TwitterController } from './twitter.controller';
import { TwitterService } from './twitter.service';

@Module({
  controllers: [TwitterController],
  providers: [TwitterService],
  exports: [TwitterService],
})
export class TwitterModule {}
