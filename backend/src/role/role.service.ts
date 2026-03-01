import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { prisma } from 'src/prisma';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleDto } from './dto/role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  async getRoles(): Promise<RoleDto[]> {
    const roles = await prisma.role.findMany();
    return this.mapper.mapArray(roles as RoleEntity[], RoleEntity, RoleDto);
  }

  async getRoleById(id: string): Promise<RoleDto> {
    const role = await prisma.role.findUnique({ where: { id } });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return this.mapper.map(role as RoleEntity, RoleEntity, RoleDto);
  }

  async getUserRoles(userId: string): Promise<RoleDto[]> {
    const roles = await prisma.role.findMany({
      where: { users: { some: { id: userId } } },
    });
    return this.mapper.mapArray(roles as RoleEntity[], RoleEntity, RoleDto);
  }

  async createRole(data: CreateRoleDto): Promise<RoleDto> {
    try {
      const role = await prisma.role.create({ data });
      return this.mapper.map(role as RoleEntity, RoleEntity, RoleDto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Role already exists');
      }
      throw error;
    }
  }

  async updateRole(id: string, data: UpdateRoleDto): Promise<RoleDto> {
    try {
      const role = await prisma.role.update({ where: { id }, data });
      return this.mapper.map(role as RoleEntity, RoleEntity, RoleDto);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Role not found');
      }
      if (error.code === 'P2002') {
        throw new ConflictException('Role already exists');
      }
      throw error;
    }
  }

  async deleteRole(id: string): Promise<void> {
    try {
      await prisma.role.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Role not found');
      }
      if (error.code === 'P2003') {
        throw new ConflictException('Cannot delete role assigned to users');
      }
      throw error;
    }
  }
}
