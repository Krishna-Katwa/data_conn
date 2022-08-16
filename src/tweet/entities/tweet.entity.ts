import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToOne,
  Entity,
} from 'typeorm';

import { HashtagEntity } from '../../hashtag/entities/hashtag.entity';

import { ProfileEntity } from '../../profile/entities/profile.entity';

@Entity('tweet')
export class TweetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  //relations

  @OneToOne(() => ProfileEntity, (profileEntity) => profileEntity.id)
  ProfileEntity: ProfileEntity;

  @ManyToOne(() => ProfileEntity, (profileEntity) => profileEntity.id)
  profileEntity: ProfileEntity;

  @ManyToMany(
    () => HashtagEntity,
    (hashtagentity) => hashtagentity.tweetEntity,
    { cascade: ['remove'] },
  )
  @JoinTable()
  hashtagentity: HashtagEntity[];
}
