import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { LanguageEntity } from './entities/language.entity';
import { LanguageDto } from './dto/language.dto';

@Injectable()
export class LanguageProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, LanguageEntity, LanguageDto);
    };
  }
}
