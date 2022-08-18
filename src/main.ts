import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport:Transport.MQTT,
    options: {
      hostname: 'broker.mqttdashboard.com',
      port: 8000,
      protocol: 'mqtt',
    }
  });
  //app.setGlobalPrefix('users');
  app.useGlobalPipes(new ValidationPipe({transform: true }));
  await app.listen();
}
bootstrap();
