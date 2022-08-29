import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserPost } from './user.interface';

export type User = any;

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor(
    @InjectRepository(UserEntity)
    private readonly UserEntityRepository: Repository<UserEntity>,
  ) {
    this.users = [
      {
        userId: 1,
        username: 'a',
        password: 'a1',
      },
      {
        userId: 2,
        username: 'b',
        password: 'b2',
      },
      {
        userId: 3,
        username: 'c',
        password: 'c3',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  create(createUserDto: CreateUserDto): Observable<UserPost> {
    return from(this.UserEntityRepository.save(createUserDto));
  }

  async findByEmail(email: string) {
    return await this.UserEntityRepository.findOne({
      where: { email: email },
    });
  }

  findAll(): Observable<UserPost[]> {
    return from(this.UserEntityRepository.find());
  }

  FindOne(id: number): Observable<UserPost> {
    return from(this.UserEntityRepository.findOneBy({ id }));
  }

  update(id: number, userPost: UserPost): Observable<UpdateResult> {
    return from(this.UserEntityRepository.update(id, userPost));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.UserEntityRepository.delete(id));
  }
}
