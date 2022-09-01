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
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Observable } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ProfilePost } from './profile.interface';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';


// @UseGuards(AuthGuard('jwt'))
@ApiTags('Profile')
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

  @ApiBearerAuth()
  @ApiCookieAuth()
  @Get()
  findAll(): Observable<ProfilePost[]> {
    return this.profileService.findAll();
  }

  @ApiBearerAuth()
  @ApiCookieAuth()
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

  @ApiBearerAuth()
  @ApiCookieAuth()
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() profilePost: ProfilePost,
  ): Observable<UpdateResult> {
    return this.profileService.update(+id, profilePost);
  }

  @ApiBearerAuth()
  @ApiCookieAuth()
  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.profileService.delete(+id);
  }
}
