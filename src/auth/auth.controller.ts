/* import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './guards/jwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @UseGuards(AuthGuard)
  @Post('/login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  //@UseGuards(AuthGuard)
  //@Post('/signin')
  //async create(@Body() authLoginDto:AuthLoginDto) {
    //return this.authService.create(authLoginDto);
  //}
/*  

  @UseGuards(JwtAuthGuard)
  @Get('/protected')
  findOne(@Body() username:string, password:string ):Promise<string> {
    return this.authService.validateUser(username,password); 
  }
}
 */
