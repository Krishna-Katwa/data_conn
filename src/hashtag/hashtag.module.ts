import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './hashtag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashtagEntity } from './entities/hashtag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HashtagEntity])],
  controllers: [HashtagController],
  providers: [HashtagService],
})
export class HashtagModule {}
