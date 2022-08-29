import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './hashtag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashtagEntity } from './entities/hashtag.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/guards/localAuth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([HashtagEntity]),
    // PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [HashtagController],
  providers: [HashtagService, LocalAuthGuard],
})
export class HashtagModule {}
