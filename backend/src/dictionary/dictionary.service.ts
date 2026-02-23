import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { prisma } from 'src/prisma';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { DictionaryDto } from './dto/dictionary.dto';

const DICTIONARY_INCLUDE = {
  _count: { select: { words: true } },
} as const;

type DictionaryWithCount = {
  id: string;
  name: string;
  languageId: string;
  createdAt: Date;
  updatedAt: Date;
  _count: { words: number };
};

@Injectable()
export class DictionaryService {
  private toDto(d: DictionaryWithCount): DictionaryDto {
    const dto = new DictionaryDto();
    dto.id = d.id;
    dto.name = d.name;
    dto.languageId = d.languageId;
    dto.wordCount = d._count.words;
    dto.createdAt = d.createdAt;
    dto.updatedAt = d.updatedAt;
    return dto;
  }

  async getDictionaries(): Promise<DictionaryDto[]> {
    const dictionaries = await prisma.dictionary.findMany({ include: DICTIONARY_INCLUDE });
    return dictionaries.map((d) => this.toDto(d));
  }

  async getDictionariesWithWords(): Promise<DictionaryDto[]> {
    const dictionaries = await prisma.dictionary.findMany({ include: DICTIONARY_INCLUDE });
    return dictionaries.filter((d) => d._count.words > 0).map((d) => this.toDto(d));
  }

  async getDictionaryById(id: string): Promise<DictionaryDto> {
    const dictionary = await prisma.dictionary.findUnique({ where: { id }, include: DICTIONARY_INCLUDE });
    if (!dictionary) {
      throw new NotFoundException('Dictionary not found');
    }
    return this.toDto(dictionary);
  }

  async createDictionary(data: CreateDictionaryDto): Promise<DictionaryDto> {
    try {
      const dictionary = await prisma.dictionary.create({ data, include: DICTIONARY_INCLUDE });
      return this.toDto(dictionary);
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
      return this.toDto(dictionary);
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