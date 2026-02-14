import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { Dictionary } from '@prisma/client';

@Controller('dictionaries')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get()
  getDictionaries(): Promise<Dictionary[]> {
    return this.dictionaryService.getDictionaries();
  }

  @Get(':id')
  getDictionaryById(@Param('id') id: string): Promise<Dictionary | null> {
    return this.dictionaryService.getDictionaryById(id);
  }

  @Post()
  createDictionary(@Body() body: { name: string; languageId: string }): Promise<Dictionary> {
    return this.dictionaryService.createDictionary(body);
  }

  @Put(':id')
  updateDictionary(
    @Param('id') id: string,
    @Body() body: { name?: string; languageId?: string },
  ): Promise<Dictionary> {
    return this.dictionaryService.updateDictionary(id, body);
  }

  @Delete(':id')
  deleteDictionary(@Param('id') id: string): Promise<Dictionary> {
    return this.dictionaryService.deleteDictionary(id);
  }
}
