import { Injectable } from '@nestjs/common';
import { prisma } from '../prisma';

@Injectable()
export class UserService {
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return;
    }
    if (user.password !== password) {
      return;
    }
    return user;
  }

  async getUsers() {
    return await prisma.user.findMany();
  }

  async getUserById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async createUser(data: any) {
    return await prisma.user.create({ data });
  }

  async verifyUser(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return;
    }

    await prisma.user.update({ where: { id }, data: user });
    return;
  }

  async updateUser(id: string, data: any) {
    return await prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: string) {
    return await prisma.user.delete({ where: { id } });
  }
}
