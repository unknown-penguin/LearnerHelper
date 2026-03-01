import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { prisma } from 'src/prisma';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { WordDto } from './dto/word.dto';
import { WordEntity } from './entities/word.entity';
import { WordWithLanguage } from './dto/word-with-language.dto';

@Injectable()
export class WordService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  async getByDictionary(dictionaryId: string): Promise<WordWithLanguage[]> {
    const words = await prisma.word.findMany({
      where: { dictionaryId },
      include: { dictionary: { include: { language: true } } },
    });

    return words.map((w) => ({
      id: w.id,
      word: w.word,
      partOfSpeech: w.partOfSpeech,
      definition: w.definition,
      languageLevel: w.languageLevel,
      language: w.dictionary.language.name,
    }));
  }

  async getById(id: string): Promise<WordDto> {
    const word = await prisma.word.findUnique({ where: { id } });
    if (!word) {
      throw new NotFoundException('Word not found');
    }
    return this.mapper.map(word as WordEntity, WordEntity, WordDto);
  }

  async create(data: CreateWordDto): Promise<WordDto> {
    try {
      const word = await prisma.word.create({ data });
      return this.mapper.map(word as WordEntity, WordEntity, WordDto);
    } catch (error) {
      if (error.code === 'P2003') {
        throw new NotFoundException('Dictionary not found');
      }
      throw error;
    }
  }

  async update(id: string, data: UpdateWordDto): Promise<WordDto> {
    try {
      const word = await prisma.word.update({ where: { id }, data });
      return this.mapper.map(word as WordEntity, WordEntity, WordDto);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Word not found');
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.word.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Word not found');
      }
      throw error;
    }
  }
}