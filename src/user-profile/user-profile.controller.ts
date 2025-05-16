import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Controller('profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post('create')
  create(@Body() dto: CreateUserProfileDto) {
    return this.userProfileService.create(dto);
  }

  @Get()
  findAll() {
    return this.userProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.userProfileService.findOne(id);
  }

  @Patch('edit/:id')
  update(@Param('id') id, @Body() body: UpdateUserProfileDto) {
    return this.userProfileService.update(id, body);
  }

  // @Delete('delete/:id')
  // remove(@Param('id') id: string) {
  //   return this.userProfileService.remove(+id);
  //}
}
