import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { prisma } from 'src/prisma';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { DictionaryDto } from './dto/dictionary.dto';
import { DictionaryEntity } from './entities/dictionary.entity';

const DICTIONARY_INCLUDE = {
  _count: { select: { words: true } },
} as const;

@Injectable()
export class DictionaryService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  async getDictionaries(): Promise<DictionaryDto[]> {
    const dictionaries = await prisma.dictionary.findMany({ include: DICTIONARY_INCLUDE });
    return this.mapper.mapArray(dictionaries as DictionaryEntity[], DictionaryEntity, DictionaryDto);
  }

  async getDictionariesWithWords(): Promise<DictionaryDto[]> {
    const dictionaries = await prisma.dictionary.findMany({ include: DICTIONARY_INCLUDE });
    const withWords = dictionaries.filter((d) => d._count.words > 0);
    return this.mapper.mapArray(withWords as DictionaryEntity[], DictionaryEntity, DictionaryDto);
  }

  async getDictionaryById(id: string): Promise<DictionaryDto> {
    const dictionary = await prisma.dictionary.findUnique({ where: { id }, include: DICTIONARY_INCLUDE });
    if (!dictionary) {
      throw new NotFoundException('Dictionary not found');
    }
    return this.mapper.map(dictionary as DictionaryEntity, DictionaryEntity, DictionaryDto);
  }

  async createDictionary(data: CreateDictionaryDto): Promise<DictionaryDto> {
    try {
      const dictionary = await prisma.dictionary.create({ data, include: DICTIONARY_INCLUDE });
      return this.mapper.map(dictionary as DictionaryEntity, DictionaryEntity, DictionaryDto);
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

  async updateDictionary(id: string, data: UpdateDictionaryDto): Promise<DictionaryDto> {
    try {
      const dictionary = await prisma.dictionary.update({ where: { id }, data, include: DICTIONARY_INCLUDE });
      return this.mapper.map(dictionary as DictionaryEntity, DictionaryEntity, DictionaryDto);
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

  async deleteDictionary(id: string): Promise<void> {
    try {
      await prisma.dictionary.delete({ where: { id } });
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