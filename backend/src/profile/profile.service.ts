import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../prisma';
import { ProfileDto } from './dto/profile.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  private toDto(p: { id: string; userId: string; createdAt: Date; updatedAt: Date }): ProfileDto {
    const dto = new ProfileDto();
    dto.id = p.id;
    dto.userId = p.userId;
    dto.createdAt = p.createdAt;
    dto.updatedAt = p.updatedAt;
    return dto;
  }

  async getProfiles(): Promise<ProfileDto[]> {
    const profiles = await prisma.profile.findMany();
    return profiles.map((p) => this.toDto(p));
  }

  async getProfileById(id: string): Promise<ProfileDto> {
    const profile = await prisma.profile.findUnique({ where: { id } });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return this.toDto(profile);
  }

  async createProfile(data: CreateProfileDto): Promise<ProfileDto> {
    const profile = await prisma.profile.create({ data });
    return this.toDto(profile);
  }

  async updateProfile(id: string, data: UpdateProfileDto): Promise<ProfileDto> {
    try {
      const profile = await prisma.profile.update({ where: { id }, data });
      return this.toDto(profile);
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
