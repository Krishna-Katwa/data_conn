import {
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  Entity,
  Unique,
} from 'typeorm';
import { TweetEntity } from 'src/tweet/entities/tweet.entity';
import { DefaultValuePipe } from '@nestjs/common';

@Entity('hashtag')
export class HashtagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;

  //relations

  @ManyToMany(() => TweetEntity, (tweetEntity) => tweetEntity.id)
  @JoinTable()
  tweetEntity: TweetEntity[];
  //static tweets: TweetEntity[];
}
