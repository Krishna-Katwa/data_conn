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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { hash } from 'bcrypt';
import passport, { Passport } from 'passport';
import { Hash } from 'crypto';


@ApiBearerAuth()
@ApiTags('cats')
@Controller('/info')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create cat' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseFilters()
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
  @ApiResponse({
    status: 200,
    description: 'The found record from the DB',
    type: ApiResponse,  
  })
  findOne(@Param('id',
    new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}),
  )
   id:number ) {
    return this.userService.FindOne(+id); 
 }

  @Patch(':id')
  update(
    @Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}),) id: number,
    @Body() userPost: UserPost,
  ): Observable<UpdateResult> {
    return this.userService.update(+id, userPost);
  }

  @Delete(':id')
  remove(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}),) id: number): Observable<DeleteResult> {
    return this.userService.delete(+id);
  }
}