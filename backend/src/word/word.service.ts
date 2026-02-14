import { Injectable } from '@nestjs/common';
import { prisma } from 'src/prisma';
import { Word } from '@prisma/client';

@Injectable()
export class WordService {
  async getWords(dictionaryId: string): Promise<any[]> { 
    const words = await prisma.word.findMany({
      where: {
        dictionaryId,
      },
      include: {
        dictionary: {
          include: {
            language: true,
          },
        },
      },
    });
    
    return words.map(word => ({
      id: word.id,
      word: word.word,
      partOfSpeech: word.partOfSpeech,
      definition: word.definition,
      languageLevel: word.languageLevel,
      language: word.dictionary.language.name,
    }));
  }

  async getWordById(id: string): Promise<Word | null> {
    return await prisma.word.findUnique({
      where: {
        id,
      },
    });
  }

  async createWord(wordData: Omit<Word, 'id'>): Promise<Word> {
    return await prisma.word.create({
      data: wordData,
    });
  }

  async updateWord(id: string, wordData: Partial<Omit<Word, 'id'>>): Promise<Word> {
    return await prisma.word.update({
      where: { id },
      data: wordData,
    });
  }

  async deleteWord(id: string): Promise<Word> {
    return await prisma.word.delete({
      where: { id },
    });
  }
}