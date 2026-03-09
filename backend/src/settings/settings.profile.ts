import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { SettingsEntity } from './entities/settings.entity';
import { SettingsDto } from './dto/settings.dto';

@Injectable()
export class SettingsProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, SettingsEntity, SettingsDto);
    };
  }
}
