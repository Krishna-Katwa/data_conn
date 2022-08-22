import { Controller, Get, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { ClientProxy, Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwtAuth.guard';
import { LocalAuthGuard } from './auth/guards/localAuth.guard';

@Controller('/auth')
export class AppController {
  constructor(private readonly authService: AuthService,
    
    ) {}

  // @Get('notifications')
  // getNotifications() {
  //   return this.client.send('notification_channel', "it's a msg from client")
  // }

  @MessagePattern('ftf-input')
  sumData(@Payload() payload: String, @Ctx() context:MqttContext): string{
    console.log('---new msg ${context.getTopic()}---');
    console.log("Payload: ", payload);
    console.log("Packet: ", context.getPacket());
    return payload + `response from logData() in -t ${context.getTopic()}`;
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
