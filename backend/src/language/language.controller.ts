import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { LanguageDto } from './dto/language.dto';

@ApiTags('languages')
@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Get()
  getLanguages(): Promise<LanguageDto[]> {
    return this.languageService.getLanguages();
  }

  @Get(':id')
  getLanguageById(@Param('id') id: string): Promise<LanguageDto> {
    return this.languageService.getLanguageById(id);
  }

  @Post()
  createLanguage(@Body() body: CreateLanguageDto): Promise<LanguageDto> {
    return this.languageService.createLanguage(body);
  }

  @Put(':id')
  updateLanguage(
    @Param('id') id: string,
    @Body() body: UpdateLanguageDto,
  ): Promise<LanguageDto> {
    return this.languageService.updateLanguage(id, body);
  }

  @Delete(':id')
  deleteLanguage(@Param('id') id: string): Promise<void> {
    return this.languageService.deleteLanguage(id);
  }
}
