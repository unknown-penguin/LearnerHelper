import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileDto } from './dto/profile.dto';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfiles(): Promise<ProfileDto[]> {
    return this.profileService.getProfiles();
  }
  
  @Get(':id')
  getProfileById(@Param('id') id: string): Promise<ProfileDto> {
    return this.profileService.getProfileById(id);
  }

  @Post()
  createProfile(@Body() data: CreateProfileDto): Promise<ProfileDto> {
    return this.profileService.createProfile(data);
  }

  @Put(':id')
  updateProfile(@Param('id') id: string, @Body() data: UpdateProfileDto): Promise<ProfileDto> {
    return this.profileService.updateProfile(id, data);
  }

  @Delete(':id')
  deleteProfile(@Param('id') id: string): Promise<void> {
    return this.profileService.deleteProfile(id);
  }
}
