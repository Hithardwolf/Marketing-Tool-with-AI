import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DatabaseService } from '../database/db.service';

@Module({
  controllers: [AuthController],
  providers: [DatabaseService],
})
export class AuthModule {}
