import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HashtagEntity } from 'src/hashtag/entities/hashtag.entity';
import { ProfileEntity } from 'src/profile/entities/profile.entity';
import { TweetEntity } from 'src/tweet/entities/tweet.entity';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ProfileEntity,
      TweetEntity,
      HashtagEntity,
    ]),
    // PassportModule.register({ defaultStrategy: 'jwt' }),
  ],

  controllers: [UserController],

  providers: [UserService],

  exports: [UserService],
})
export class UserModule {}
