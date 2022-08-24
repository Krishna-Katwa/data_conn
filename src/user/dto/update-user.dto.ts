import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id?: number;
  fname: string;
  lname: string;
  email: string;
  password: string;
  createdAT: Date;
}
