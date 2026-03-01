import { AutoMap } from '@automapper/classes';

export class DictionaryDto {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  languageId: string;

  @AutoMap()
  wordCount: number;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
