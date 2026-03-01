import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { prisma } from 'src/prisma';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionDto } from './dto/permission.dto';
import { PermissionEntity } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  async getPermissions(): Promise<PermissionDto[]> {
    const permissions = await prisma.permission.findMany();
    return this.mapper.mapArray(permissions as PermissionEntity[], PermissionEntity, PermissionDto);
  }

  async getPermissionById(id: string): Promise<PermissionDto> {
    const permission = await prisma.permission.findUnique({ where: { id } });
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    return this.mapper.map(permission as PermissionEntity, PermissionEntity, PermissionDto);
  }

  async createPermission(data: CreatePermissionDto): Promise<PermissionDto> {
    try {
      const permission = await prisma.permission.create({ data });
      return this.mapper.map(permission as PermissionEntity, PermissionEntity, PermissionDto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Permission already exists');
      }
      throw error;
    }
  }

  async updatePermission(id: string, data: UpdatePermissionDto): Promise<PermissionDto> {
    try {
      const permission = await prisma.permission.update({ where: { id }, data });
      return this.mapper.map(permission as PermissionEntity, PermissionEntity, PermissionDto);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Permission not found');
      }
      if (error.code === 'P2002') {
        throw new ConflictException('Permission already exists');
      }
      throw error;
    }
  }

  async deletePermission(id: string): Promise<void> {
    try {
      await prisma.permission.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Permission not found');
      }
      if (error.code === 'P2003') {
        throw new ConflictException('Cannot delete permission assigned to roles');
      }
      throw error;
    }
  }
}
