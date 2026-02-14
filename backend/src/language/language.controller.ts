import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LanguageService } from './language.service';
import { Language } from '@prisma/client';

@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Get()
  getLanguages(): Promise<Language[]> {
    return this.languageService.getLanguages();
  }

  @Get(':id')
  getLanguageById(@Param('id') id: string): Promise<Language | null> {
    return this.languageService.getLanguageById(id);
  }

  @Post()
  createLanguage(@Body() body: { name: string; code: string }): Promise<Language> {
    return this.languageService.createLanguage(body);
  }

  @Put(':id')
  updateLanguage(
    @Param('id') id: string,
    @Body() body: { name?: string; code?: string },
  ): Promise<Language> {
    return this.languageService.updateLanguage(id, body);
  }

  @Delete(':id')
  deleteLanguage(@Param('id') id: string): Promise<Language> {
    return this.languageService.deleteLanguage(id);
  }
}
