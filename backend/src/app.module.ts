import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PosterModule } from './poster/poster.module';
import { TwitterModule } from './twitter/twitter.module';
import { DatabaseService } from './database/db.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PosterModule,
    TwitterModule,
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class AppModule {}
