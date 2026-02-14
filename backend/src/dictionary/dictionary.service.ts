import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { prisma } from 'src/prisma';
import { Dictionary } from '@prisma/client';
import { CreateDictionaryDto, UpdateDictionaryDto } from './dictionary.dto';

const DICTIONARY_INCLUDE = {
  _count: { select: { words: true } },
} as const;

@Injectable()
export class DictionaryService {
  async getDictionaries(): Promise<Dictionary[]> {
    return await prisma.dictionary.findMany({ include: DICTIONARY_INCLUDE });
  }

  async getDictionaryById(id: string): Promise<Dictionary | null> {
    const dictionary = await prisma.dictionary.findUnique({ where: { id }, include: DICTIONARY_INCLUDE });
    if (!dictionary) {
      throw new NotFoundException('Dictionary not found');
    }
    return dictionary;
  }

  async createDictionary(data: CreateDictionaryDto): Promise<Dictionary> {
    try {
      return await prisma.dictionary.create({ data, include: DICTIONARY_INCLUDE });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Dictionary already exists');
      }
      if (error.code === 'P2003') {
        throw new NotFoundException('Language not found');
      }
      throw error;
    }
  }

  async updateDictionary(id: string, data: UpdateDictionaryDto): Promise<Dictionary> {
    try {
      return await prisma.dictionary.update({ where: { id }, data, include: DICTIONARY_INCLUDE });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Dictionary not found');
      }
      if (error.code === 'P2002') {
        throw new ConflictException('Dictionary already exists');
      }
      throw error;
    }
  }

  async deleteDictionary(id: string): Promise<Dictionary> {
    try {
      return await prisma.dictionary.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Dictionary not found');
      }
      if (error.code === 'P2003') {
        throw new ConflictException('Cannot delete dictionary with words');
      }
      throw error;
    }
  }
}