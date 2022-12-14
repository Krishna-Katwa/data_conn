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
  HttpCode,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Observable } from 'rxjs';
import { UserPost } from './user.interface';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

// @UseGuards(AuthGuard('jwt'))
@ApiTags('Users')
@Controller('/info')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  // @ApiCookieAuth()
  @ApiCreatedResponse({ description: 'Create users' })
  @ApiOperation({ summary: 'Create users' })
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseFilters()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Observable<CreateUserDto>> {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @ApiCookieAuth()
  @Get()
  @ApiOperation({ summary: 'List of all the users' })
  @ApiOkResponse({ description: 'List of all the users' })
  findAll(): Observable<UserPost[]> {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @ApiCookieAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Users by id' })
  @ApiOkResponse({ description: 'Users by id' })
  @ApiBadRequestResponse({ description: 'user not found' })
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.userService.FindOne(+id);
  }

  @ApiBearerAuth()
  @ApiCookieAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update users' })
  @ApiCreatedResponse({ description: 'Update users' })
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() userPost: UserPost,
  ): Observable<UpdateResult> {
    return this.userService.update(+id, userPost);
  }

  @ApiBearerAuth()
  @ApiCookieAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete users' })
  @ApiCreatedResponse({ description: 'Delete users' })
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Observable<DeleteResult> {
    return this.userService.delete(+id);
  }
}

export interface UserResponse {
  fname: string;
  lnmae: string;
  email: string;
  password: string;
}
export interface AuthResponse extends UserResponse {
  token: string;
}

export type ResponseObject<K extends string, T> = {
  [P in K]: T;
};
