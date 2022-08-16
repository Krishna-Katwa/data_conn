import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { HashtagEntity } from './entities/hashtag.entity';
import { HashtagPost } from './hashtag.interface';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(HashtagEntity)
    private readonly hashtagEntityRepository: Repository<HashtagEntity>,
  ) {}

  create(hashtagPost: HashtagPost): Observable<HashtagPost> {
    return from(this.hashtagEntityRepository.save(hashtagPost));
  }

  findAll(): Observable<HashtagPost[]> {
    return from(this.hashtagEntityRepository.find());
  }

  FindOne(id: number): Observable<HashtagPost> {
    return from(this.hashtagEntityRepository.findOneBy({ id }));
  }

  update(id: number, hashtagPost: HashtagPost): Observable<UpdateResult> {
    return from(this.hashtagEntityRepository.update(id, hashtagPost));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.hashtagEntityRepository.delete(id));
  }
}
