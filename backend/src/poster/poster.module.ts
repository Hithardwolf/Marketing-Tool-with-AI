import { Module } from '@nestjs/common';
import { PosterController } from './poster.controller';
import { DatabaseService } from '../database/db.service';

@Module({
  controllers: [PosterController],
  providers: [DatabaseService],
})
export class PosterModule {}
