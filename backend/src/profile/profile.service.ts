import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { prisma } from '../prisma';
import { ProfileDto } from './dto/profile.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  async getProfiles(): Promise<ProfileDto[]> {
    const profiles = await prisma.profile.findMany();
    return this.mapper.mapArray(profiles as ProfileEntity[], ProfileEntity, ProfileDto);
  }

  async getProfileById(id: string): Promise<ProfileDto> {
    const profile = await prisma.profile.findUnique({ where: { id } });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return this.mapper.map(profile as ProfileEntity, ProfileEntity, ProfileDto);
  }

  async createProfile(data: CreateProfileDto): Promise<ProfileDto> {
    const profile = await prisma.profile.create({ data });
    return this.mapper.map(profile as ProfileEntity, ProfileEntity, ProfileDto);
  }

  async updateProfile(id: string, data: UpdateProfileDto): Promise<ProfileDto> {
    try {
      const profile = await prisma.profile.update({ where: { id }, data });
      return this.mapper.map(profile as ProfileEntity, ProfileEntity, ProfileDto);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Profile not found');
      }
      throw error;
    }
  }

  async deleteProfile(id: string): Promise<void> {
    try {
      await prisma.profile.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Profile not found');
      }
      throw error;
    }
  }
}
