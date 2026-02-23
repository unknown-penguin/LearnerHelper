import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from 'src/prisma';
import { PartOfSpeech } from '@prisma/client';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { WordDto } from './dto/word.dto';

export interface WordWithLanguage {
  id: string;
  word: string;
  partOfSpeech: string;
  definition: string;
  languageLevel: string;
  language: string;
}

@Injectable()
export class WordService {
  private toDto(w: { id: string; word: string; partOfSpeech: PartOfSpeech; definition: string; languageLevel: string; dictionaryId: string; createdAt: Date; updatedAt: Date }): WordDto {
    const dto = new WordDto();
    dto.id = w.id;
    dto.word = w.word;
    dto.partOfSpeech = w.partOfSpeech;
    dto.definition = w.definition;
    dto.languageLevel = w.languageLevel;
    dto.dictionaryId = w.dictionaryId;
    dto.createdAt = w.createdAt;
    dto.updatedAt = w.updatedAt;
    return dto;
  }

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
    return this.toDto(word);
  }

  async create(data: CreateWordDto): Promise<WordDto> {
    try {
      const word = await prisma.word.create({ data });
      return this.toDto(word);
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
      return this.toDto(word);
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