import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Observable } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ProfilePost } from './profile.interface';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post([])
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<Observable<ProfilePost>> {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  findAll(): Observable<ProfilePost[]> {
    return this.profileService.findAll();
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
    return this.profileService.FindOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() profilePost: ProfilePost,
  ): Observable<UpdateResult> {
    return this.profileService.update(+id, profilePost);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.profileService.delete(+id);
  }
}
