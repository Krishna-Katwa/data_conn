import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  sumDataService(payload: number[]) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(credential: AuthLoginDto): Promise<any> {
    try {
      const user = this.userService.create({
        id: 0,
        fname: '',
        lname: '',
        email: '',
        password: '',
        createdAT: undefined,
      });
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
}
