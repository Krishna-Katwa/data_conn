import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { ProfileModule } from './profile/profile.module';
import { TweetModule } from './tweet/tweet.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //[REQUIRED if want to use .env gloablly among all modules]
    }),
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport:Transport.MQTT,
        options: {
        url : 'mqtt://localhost:1883',
        }
      },
  ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: process.env.DB_TYPE as any,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PRORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        logging: true,
        entities: [__dirname + '/../**/*.entity.js'],
        autoLoadEntities: true,
        keepConnectionAlive: true,
        //    dropSchema:true,
        //    synchronize: true,
      }),
      // inject:[ConfigService],
    }),
    AppModule,
    UserModule,
    HashtagModule,
    ProfileModule,
    TweetModule,
    AuthModule,
    //TypeOrmModule.forFeature([ProfileRepository, ])
  ],

  controllers: [
    AppController,
    //UserController,
    //HashtagController,
    //ProfileController,
    //TweetController,
  ],

  providers: [
    AppService,
    //UserService,
    //ProfileService,
    //HashtagService,
    //TweetService,
  ],
})
export class AppModule {}
