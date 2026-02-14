import { Injectable } from '@nestjs/common';
import { prisma } from 'src/prisma';
import { Dictionary } from '@prisma/client';

const DICTIONARY_INCLUDE = {
  _count: { select: { words: true } },
} as const;

@Injectable()
export class DictionaryService {
  async getDictionaries(): Promise<Dictionary[]> {
    return prisma.dictionary.findMany({ include: DICTIONARY_INCLUDE });
  }

  async getDictionaryById(id: string): Promise<Dictionary | null> {
    return prisma.dictionary.findUnique({ where: { id }, include: DICTIONARY_INCLUDE });
  }

  async createDictionary(data: { name: string; languageId: string }): Promise<Dictionary> {
    return prisma.dictionary.create({ data, include: DICTIONARY_INCLUDE });
  }

  async updateDictionary(id: string, data: { name?: string; languageId?: string }): Promise<Dictionary> {
    return prisma.dictionary.update({ where: { id }, data, include: DICTIONARY_INCLUDE });
  }

  async deleteDictionary(id: string): Promise<Dictionary> {
    return prisma.dictionary.delete({ where: { id } });
  }
}