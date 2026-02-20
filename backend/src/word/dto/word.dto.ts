import { PartOfSpeech } from '@prisma/client';

export class WordDto {
  id: string;
  word: string;
  definition: string;
  partOfSpeech: PartOfSpeech;
  languageLevel: string;
  dictionaryId: string;
  createdAt: Date;
  updatedAt: Date;
}
