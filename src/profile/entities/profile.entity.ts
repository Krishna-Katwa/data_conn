import { TweetEntity } from '../../tweet/entities/tweet.entity';
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  followers: number;

  @Column()
  following: number;

  //relations

  @OneToMany(() => TweetEntity, (tweetEntity) => tweetEntity.profileEntity)
  tweetEntity: TweetEntity;
}
