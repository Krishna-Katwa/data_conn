import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id?: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  secretid: number;
  createdAT: Date;
}
