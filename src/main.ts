import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  
  //MQTT
  const app1 = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.MQTT,
      options: {
        url: 'mqtt://104.198.63.61',
      },
    },
  );
  await app1.listen();

  //open API ....
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('users example')
    .setDescription('The users API description')
    .setVersion('1.0.0')
    .addTag('users')
    .addBearerAuth({ type: 'http', scheme: 'bearer',              bearerFormat: 'Token' },'access-token', )
    .build();

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('users', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
