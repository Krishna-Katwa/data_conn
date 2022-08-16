import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Observable } from 'rxjs';
import { UserPost } from './user.interface';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('/info')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Observable<CreateUserDto>> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Observable<UserPost[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: any,
  ) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() userPost: UserPost,
  ): Observable<UpdateResult> {
    return this.userService.update(+id, userPost);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.userService.delete(+id);
  }
}
