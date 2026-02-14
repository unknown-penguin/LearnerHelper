import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { WordService, WordWithLanguage } from './word.service';
import { Word } from '@prisma/client';

@Controller('words')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get()
  getByDictionary(@Query('dictionaryId') dictionaryId: string): Promise<WordWithLanguage[]> {
    return this.wordService.getByDictionary(dictionaryId);
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Word | null> {
    return this.wordService.getById(id);
  }

  @Post()
  create(@Body() data: Omit<Word, 'id'>): Promise<Word> {
    return this.wordService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Omit<Word, 'id'>>): Promise<Word> {
    return this.wordService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Word> {
    return this.wordService.delete(id);
  }
}
