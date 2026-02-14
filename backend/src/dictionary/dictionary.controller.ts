import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DictionaryService } from './dictionary.service';
import { Dictionary } from '@prisma/client';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';

@ApiTags('dictionaries')
@Controller('dictionaries')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get()
  getDictionaries(): Promise<Dictionary[]> {
    return this.dictionaryService.getDictionaries();
  }

  @Get('quiz/available')
  getDictionariesWithWords(): Promise<Dictionary[]> {
    return this.dictionaryService.getDictionariesWithWords();
  }

  @Get(':id')
  getDictionaryById(@Param('id') id: string): Promise<Dictionary | null> {
    return this.dictionaryService.getDictionaryById(id);
  }

  @Post()
  createDictionary(@Body() body: CreateDictionaryDto): Promise<Dictionary> {
    return this.dictionaryService.createDictionary(body);
  }

  @Put(':id')
  updateDictionary(
    @Param('id') id: string,
    @Body() body: UpdateDictionaryDto,
  ): Promise<Dictionary> {
    return this.dictionaryService.updateDictionary(id, body);
  }

  @Delete(':id')
  deleteDictionary(@Param('id') id: string): Promise<Dictionary> {
    return this.dictionaryService.deleteDictionary(id);
  }
}
