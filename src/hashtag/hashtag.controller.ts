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
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { Observable } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { HashtagPost } from './hashtag.interface';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@UseGuards(AuthGuard())
@ApiTags('Hashtag')
@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Post([])
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createHashtagDto: CreateHashtagDto,
  ): Promise<Observable<HashtagPost>> {
    return this.hashtagService.create(createHashtagDto);
  }

  @Get()
  findAll(): Observable<HashtagPost[]> {
    return this.hashtagService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    console.log(typeof id == 'number');
    return this.hashtagService.FindOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() hashtagPost: HashtagPost,
  ): Observable<UpdateResult> {
    return this.hashtagService.update(+id, hashtagPost);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.hashtagService.delete(+id);
  }
}
