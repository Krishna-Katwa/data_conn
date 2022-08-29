import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse,ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthResponse, ResponseObject } from 'src/user/user.controller';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/users')
  @ApiCreatedResponse({ description: 'User Registration' })
  @ApiBody({ type: CreateUserDto })
  async register(
    @Body(ValidationPipe) credential: CreateUserDto,
  ): Promise<ResponseObject<'user', AuthResponse>> {
    const user = await this.authService.register(credential);
    return { user };
  }

  @Post('/login')
  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid inputs/credentials' })
  @ApiBody({ type: AuthLoginDto })
  async login(
    @Body('user', ValidationPipe) credential: AuthLoginDto,
  ): Promise<ResponseObject<'user', AuthResponse>> {
    const user = await this.authService.login(credential);
    return;
  }
}
