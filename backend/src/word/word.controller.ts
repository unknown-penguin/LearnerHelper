import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WordService } from './word.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { WordDto } from './dto/word.dto';
import { WordWithLanguage } from './dto/word-with-language.dto';

@ApiTags('words')
@Controller('words')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get()
  getByDictionary(@Query('dictionaryId') dictionaryId: string): Promise<WordWithLanguage[]> {
    return this.wordService.getByDictionary(dictionaryId);
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<WordDto> {
    return this.wordService.getById(id);
  }

  @Post()
  create(@Body() data: CreateWordDto): Promise<WordDto> {
    return this.wordService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateWordDto): Promise<WordDto> {
    return this.wordService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.wordService.delete(id);
  }
}
