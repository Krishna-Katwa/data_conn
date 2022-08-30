import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateHashtagDto {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  tag: string;
}
