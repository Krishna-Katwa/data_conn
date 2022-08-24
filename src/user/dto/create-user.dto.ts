import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateUserDto {
  id: number;

  @IsNotEmpty()
  @IsString()
  fname: string;

  @IsNotEmpty()
  @IsString()
  lname: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  password: string;

 
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAT: Date;
}
