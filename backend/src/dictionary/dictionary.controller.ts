import { Controller, Get } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { Dictionary } from '@prisma/client';
@Controller('dictionaries')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get()
  async getDictionary(): Promise<Dictionary[]> {
    return await this.dictionaryService.getDictionary();
  }
}
