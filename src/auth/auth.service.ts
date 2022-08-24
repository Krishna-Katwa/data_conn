import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  sumDataService(payload: number[]) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(credential: CreateUserDto): Promise<any> {
    try {
      const user = this.userService.create(credential);
      await user.subscribe();
      const payload = { username: UserEntity };
      const token = this.jwtService.sign(payload);
      return { ...user, token };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username has already been taken');
      }
      throw new InternalServerErrorException();
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  //async create(UserEntity:any){
  // const payload = {username:UserEntity.upsert.name,
  //sub:UserEntity.create(UserEntity)
  //}
  //return {acces_token: this.jwtService.sign(payload)}
}
