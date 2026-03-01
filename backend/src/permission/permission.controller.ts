import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionDto } from './dto/permission.dto';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  getPermissions(): Promise<PermissionDto[]> {
    return this.permissionService.getPermissions();
  }

  @Get(':id')
  getPermissionById(@Param('id') id: string): Promise<PermissionDto> {
    return this.permissionService.getPermissionById(id);
  }

  @Post()
  createPermission(@Body() body: CreatePermissionDto): Promise<PermissionDto> {
    return this.permissionService.createPermission(body);
  }

  @Put(':id')
  updatePermission(
    @Param('id') id: string,
    @Body() body: UpdatePermissionDto,
  ): Promise<PermissionDto> {
    return this.permissionService.updatePermission(id, body);
  }

  @Delete(':id')
  deletePermission(@Param('id') id: string): Promise<void> {
    return this.permissionService.deletePermission(id);
  }
}
