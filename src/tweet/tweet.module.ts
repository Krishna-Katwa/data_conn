import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetEntity } from './entities/tweet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TweetEntity]),
    // PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TweetController],
  providers: [TweetService],
})
export class TweetModule {}
