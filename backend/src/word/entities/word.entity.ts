import { PartOfSpeech } from '@prisma/client';
import { AutoMap } from '@automapper/classes';

export class WordEntity {
  @AutoMap()
  id: string;

  @AutoMap()
  word: string;

  @AutoMap()
  definition: string;

  @AutoMap()
  partOfSpeech: PartOfSpeech;

  @AutoMap()
  languageLevel: string;

  @AutoMap()
  dictionaryId: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
