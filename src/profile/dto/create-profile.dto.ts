import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateProfileDto {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  followers: number;

  @ApiProperty()
  following: number;
}
