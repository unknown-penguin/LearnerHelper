import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleDto } from './dto/role.dto';

@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getRoles(): Promise<RoleDto[]> {
    return this.roleService.getRoles();
  }

  @Get(':id')
  getRoleById(@Param('id') id: string): Promise<RoleDto> {
    return this.roleService.getRoleById(id);
  }

  @Get('user/:userId')
  getUserRoles(@Param('userId') userId: string): Promise<RoleDto[]> {
    return this.roleService.getUserRoles(userId);
  }

  @Post()
  createRole(@Body() body: CreateRoleDto): Promise<RoleDto> {
    return this.roleService.createRole(body);
  }

  @Put(':id')
  updateRole(
    @Param('id') id: string,
    @Body() body: UpdateRoleDto,
  ): Promise<RoleDto> {
    return this.roleService.updateRole(id, body);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: string): Promise<void> {
    return this.roleService.deleteRole(id);
  }
}