import { Injectable } from '@nestjs/common';
import { prisma } from '../prisma';

@Injectable()
export class ProfileService {
  async getProfiles() {
    return await prisma.profile.findMany();
  }

  async getProfileById(id: string) {
    return await prisma.profile.findUnique({ where: { id } });
  }

  async createProfile(data: any) {
    return await prisma.profile.create({ data });
  }

  async updateProfile(id: string, data: any) {
    return await prisma.profile.update({ where: { id }, data });
  }

  async deleteProfile(id: string) {
    return await prisma.profile.delete({ where: { id } });
  }
}
