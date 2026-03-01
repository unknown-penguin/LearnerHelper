import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { prisma } from '../prisma';
import * as argon2 from 'argon2';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  async login(email: string, password: string): Promise<UserDto> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await argon2.verify(user.password, password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.mapper.map(user as UserEntity, UserEntity, UserDto);
  }

  async getUsers(): Promise<UserDto[]> {
    const users = await prisma.user.findMany();
    return this.mapper.mapArray(users as UserEntity[], UserEntity, UserDto);
  }

  async getUserById(id: string): Promise<UserDto | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? this.mapper.map(user as UserEntity, UserEntity, UserDto) : null;
  }

  async createUser(data: CreateUserDto): Promise<UserDto> {
    if (data.password) {
      data.password = await argon2.hash(data.password);
    }
    const user = await prisma.user.create({ data });
    return this.mapper.map(user as UserEntity, UserEntity, UserDto);
  }


  async updateUser(id: string, data: UpdateUserDto): Promise<UserDto> {
    if (data.password) {
      data.password = await argon2.hash(data.password);
    }
    const user = await prisma.user.update({ where: { id }, data });
    return this.mapper.map(user as UserEntity, UserEntity, UserDto);
  }

  async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
