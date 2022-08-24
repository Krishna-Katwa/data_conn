import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Column } from 'typeorm';

export class CreateUserDto {
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  fname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  @ApiProperty()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAT: Date;
}
