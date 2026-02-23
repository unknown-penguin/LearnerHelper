import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DictionaryService } from './dictionary.service';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { DictionaryDto } from './dto/dictionary.dto';

@ApiTags('dictionaries')
@Controller('dictionaries')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get()
  getDictionaries(): Promise<DictionaryDto[]> {
    return this.dictionaryService.getDictionaries();
  }

  @Get('quiz/available')
  getDictionariesWithWords(): Promise<DictionaryDto[]> {
    return this.dictionaryService.getDictionariesWithWords();
  }

  @Get(':id')
  getDictionaryById(@Param('id') id: string): Promise<DictionaryDto> {
    return this.dictionaryService.getDictionaryById(id);
  }

  @Post()
  createDictionary(@Body() body: CreateDictionaryDto): Promise<DictionaryDto> {
    return this.dictionaryService.createDictionary(body);
  }

  @Put(':id')
  updateDictionary(
    @Param('id') id: string,
    @Body() body: UpdateDictionaryDto,
  ): Promise<DictionaryDto> {
    return this.dictionaryService.updateDictionary(id, body);
  }

  @Delete(':id')
  deleteDictionary(@Param('id') id: string): Promise<void> {
    return this.dictionaryService.deleteDictionary(id);
  }
}
