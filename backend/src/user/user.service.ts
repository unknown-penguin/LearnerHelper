import { Injectable, UnauthorizedException } from '@nestjs/common';
import { prisma } from '../prisma';
import * as argon2 from 'argon2';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UserService {
  private toDto(user: { id: string; name: string; email: string; createdAt: Date; updatedAt: Date }): UserDto {
    const dto = new UserDto();
    dto.id = user.id;
    dto.name = user.name;
    dto.email = user.email;
    dto.createdAt = user.createdAt;
    dto.updatedAt = user.updatedAt;
    return dto;
  }

  async login(email: string, password: string): Promise<UserDto> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    try {
      if (await argon2.verify(user.password, password)) {
        return this.toDto(user);
      }
      throw new UnauthorizedException('Wrong password');
    } catch (e) {
      if (e instanceof UnauthorizedException) throw e;
      throw new UnauthorizedException('Problem with validating password');
    }
  }

  async getUsers(): Promise<UserDto[]> {
    const users = await prisma.user.findMany();
    return users.map((u) => this.toDto(u));
  }

  async getUserById(id: string): Promise<UserDto | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? this.toDto(user) : null;
  }

  async createUser(data: CreateUserDto): Promise<UserDto> {
    if (data.password) {
      data.password = await argon2.hash(data.password);
    }
    const user = await prisma.user.create({ data });
    return this.toDto(user);
  }

  async verifyUser(id: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return;
    }
    await prisma.user.update({ where: { id }, data: user });
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<UserDto> {
    if (data.password) {
      data.password = await argon2.hash(data.password);
    }
    const user = await prisma.user.update({ where: { id }, data });
    return this.toDto(user);
  }

  async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
