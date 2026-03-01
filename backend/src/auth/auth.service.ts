import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { prisma } from '../prisma';
import * as argon2 from 'argon2';
import { UserDto } from '../user/dto/user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  async login(email: string, password: string): Promise<UserDto> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await argon2.verify(user.password, password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.mapper.map(user as UserEntity, UserEntity, UserDto);
  }

  async register(data: CreateUserDto): Promise<UserDto> {
    data.password = await argon2.hash(data.password);
    const user = await prisma.user.create({ data });
    return this.mapper.map(user as UserEntity, UserEntity, UserDto);
  }
}
