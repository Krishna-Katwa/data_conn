import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TweetEntity } from './entities/tweet.entity';
import { TweetPost } from './tweet.interface';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(TweetEntity)
    private readonly tweetEntityRepository: Repository<TweetEntity>,
  ) {}

  create(tweetPost: TweetPost): Observable<TweetPost> {
    return from(this.tweetEntityRepository.save(tweetPost));
  }

  findAll(): Observable<TweetPost[]> {
    return from(this.tweetEntityRepository.find());
  }

  FindOne(id: number): Observable<TweetPost> {
    return from(this.tweetEntityRepository.findOneBy({ id }));
  }

  update(id: number, tweetPost: TweetPost): Observable<UpdateResult> {
    return from(this.tweetEntityRepository.update(id, tweetPost));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.tweetEntityRepository.delete(id));
  }
}
