import { Injectable } from '@nestjs/common';
import { prisma } from 'src/prisma';
import { Word } from '@prisma/client';

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
    return prisma.word.findUnique({ where: { id } });
  }

  async create(data: Omit<Word, 'id'>): Promise<Word> {
    return prisma.word.create({ data });
  }

  async update(id: string, data: Partial<Omit<Word, 'id'>>): Promise<Word> {
    return prisma.word.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Word> {
    return prisma.word.delete({ where: { id } });
  }
}