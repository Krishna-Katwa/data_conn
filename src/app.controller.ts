import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { AuthService } from './auth/auth.service';

@Controller('MQTT')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('ftf-input')
  sumData(@Payload() payload: String, @Ctx() context: MqttContext): string {
    console.log('---new msg ${context.getTopic()}---');
    console.log('Payload: ', payload);
    console.log('Packet: ', context.getPacket());
    return payload + `response from logData() in -t ${context.getTopic()}`;
  }
}
