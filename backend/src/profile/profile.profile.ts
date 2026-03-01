import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { ProfileEntity } from './entities/profile.entity';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, ProfileEntity, ProfileDto);
    };
  }
}
