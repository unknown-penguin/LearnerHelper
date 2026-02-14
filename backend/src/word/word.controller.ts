import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WordService, WordWithLanguage } from './word.service';
import { Word } from '@prisma/client';
import { CreateWordDto, UpdateWordDto } from './word.dto';

@ApiTags('words')
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
  create(@Body() data: CreateWordDto): Promise<Word> {
    return this.wordService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateWordDto): Promise<Word> {
    return this.wordService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Word> {
    return this.wordService.delete(id);
  }
}
