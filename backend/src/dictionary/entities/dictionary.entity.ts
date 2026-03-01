import { AutoMap } from '@automapper/classes';

export class DictionaryEntity {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  languageId: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;

  _count: { words: number };
}
