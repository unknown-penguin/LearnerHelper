import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { prisma } from '../prisma';
import * as argon2 from 'argon2';
import { UserDto } from '../user/dto/user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthResponseDto> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { roles: { include: { permissions: true } } },
    });

    if (!user || !(await argon2.verify(user.password, password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email, roles: user.roles, permissions: user.roles.flatMap(role => role.permissions)};
    const accessToken = await this.jwtService.signAsync(payload);
    const userDto = this.mapper.map(user as UserEntity, UserEntity, UserDto);
    return { accessToken, user: userDto };
  }

  async validate(token: string): Promise<AuthResponseDto> {
    let payload: { sub: string; email: string };
    try {
      payload = await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      include: { roles: { include: { permissions: true } } },
    });
    if (!user) throw new UnauthorizedException('User not found');
    const newPayload = { sub: user.id, email: user.email, roles: user.roles, permissions: user.roles.flatMap(r => r.permissions) };
    const accessToken = await this.jwtService.signAsync(newPayload);
    const userDto = this.mapper.map(user as UserEntity, UserEntity, UserDto);
    return { accessToken, user: userDto };
  }

  async register(data: CreateUserDto): Promise<UserDto> {
    const hashedPassword = await argon2.hash(data.password);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        settings: {
          create: {},
        },
      },
    });
    return this.mapper.map(user as UserEntity, UserEntity, UserDto);
  }
}
