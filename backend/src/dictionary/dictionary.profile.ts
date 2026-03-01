import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { DictionaryEntity } from './entities/dictionary.entity';
import { DictionaryDto } from './dto/dictionary.dto';

@Injectable()
export class DictionaryProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        DictionaryEntity,
        DictionaryDto,
        forMember(
          (d) => d.wordCount,
          mapFrom((s) => s._count?.words ?? 0),
        ),
      );
    };
  }
}
