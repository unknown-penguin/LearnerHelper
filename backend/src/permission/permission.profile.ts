import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { PermissionEntity } from './entities/permission.entity';
import { PermissionDto } from './dto/permission.dto';

@Injectable()
export class PermissionProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, PermissionEntity, PermissionDto);
    };
  }
}
