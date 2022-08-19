import { Controller, Get, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwtAuth.guard';
import { LocalAuthGuard } from './auth/guards/localAuth.guard';

@Controller('/auth')
export class AppController {
  constructor(private readonly authService: AuthService,
    @Inject('MQTT_SERVICE') private client : ClientProxy, 
    ) {}

    @Get('notifications')
    getNotifications() {
      return this.client.send('notification_channel', "it's a msg from client")
    }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/protect')
  getProtect(@Request() req) {
    return req.user;
  }
}
