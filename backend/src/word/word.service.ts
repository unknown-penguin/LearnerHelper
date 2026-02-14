import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from 'src/prisma';
import { Word } from '@prisma/client';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

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

  async getById(id: string): Promise<Word | null> {
    const word = await prisma.word.findUnique({ where: { id } });
    if (!word) {
      throw new NotFoundException('Word not found');
    }
    return word;
  }

  async create(data: CreateWordDto): Promise<Word> {
    try {
      return await prisma.word.create({ data });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new NotFoundException('Dictionary not found');
      }
      throw error;
    }
  }

  async update(id: string, data: UpdateWordDto): Promise<Word> {
    try {
      return await prisma.word.update({ where: { id }, data });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Word not found');
      }
      throw error;
    }
  }

  async delete(id: string): Promise<Word> {
    try {
      return await prisma.word.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Word not found');
      }
      throw error;
    }
  }
}