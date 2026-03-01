import { AutoMap } from '@automapper/classes';

export class LanguageEntity {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  code: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
