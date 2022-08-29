import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileEntity]),
    // PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
