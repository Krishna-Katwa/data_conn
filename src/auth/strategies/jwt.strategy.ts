import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-local';
import { ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private userentityRepository: Repository<UserEntity>,
    private authService:AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
  const user = await this.authService.validateUser(payload,'pass');
  try{
    if (user) {
      return done(null,user, payload.iat)
    }else if(user == null){
      const Terminal = await this.authService.login(payload);
      return done(null, Terminal, payload.iat)     
  }else{ done( new HttpException('Unauthorised access', HttpStatus.UNAUTHORIZED),
  false,
  );
  }  
}catch(error) {
  return error;
}
}
}