import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { ProfilePost } from './profile.interface';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileEntityRepository: Repository<ProfileEntity>,
  ) {}

  create(profilePost: ProfilePost): Observable<ProfilePost> {
    return from(this.profileEntityRepository.save(profilePost));
  }

  findAll(): Observable<ProfilePost[]> {
    return from(this.profileEntityRepository.find());
  }

  FindOne(id: number): Observable<ProfilePost> {
    return from(this.profileEntityRepository.findOneBy({ id }));
  }

  update(id: number, profilePost: ProfilePost): Observable<UpdateResult> {
    return from(this.profileEntityRepository.update(id, profilePost));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.profileEntityRepository.delete(id));
  }
}
