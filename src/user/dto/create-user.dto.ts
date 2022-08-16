import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateUserDto {
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsNumberString()
  secretid: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAT: Date;
}
