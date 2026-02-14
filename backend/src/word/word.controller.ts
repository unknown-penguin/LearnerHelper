import { Controller, Get, Query, Post, Delete } from '@nestjs/common';
import { WordService } from './word.service';
import { Word } from '@prisma/client';
@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get('GetDictionaryWords')
  async getWords(@Query('dictionaryId') dictionaryId: string): Promise<any[]> {
    return await this.wordService.getWords(dictionaryId);
  }

  @Get('GetWordById')
  async getWordById(@Query('id') id: string): Promise<Word | null> {
    return await this.wordService.getWordById(id);
  }

  @Post('CreateWord')
  async createWord(@Query() wordData: Omit<Word, 'id'>): Promise<Word> {
    return await this.wordService.createWord(wordData);
  }
  
  @Post('UpdateWord')
  async updateWord(@Query('id') id: string, @Query() wordData: Partial<Omit<Word, 'id'>>): Promise<Word> {
    return await this.wordService.updateWord(id, wordData);
  }

  @Delete('DeleteWord')
  async deleteWord(@Query('id') id: string): Promise<Word> {
    return await this.wordService.deleteWord(id);
  }

}
