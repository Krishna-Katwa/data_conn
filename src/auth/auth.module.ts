import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { constants } from 'buffer';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      //  secret: process.env.JWT_SECRET,
      secret: jwtConstants.secret,
      // signOptions: { expiresIn: '60s' },
    }),
  ],

  providers: [AuthService, LocalStrategy, JwtStrategy],

  exports: [AuthService],
})
export class AuthModule {}
