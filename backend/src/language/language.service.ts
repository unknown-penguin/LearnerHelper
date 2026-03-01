import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { prisma } from 'src/prisma';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { LanguageDto } from './dto/language.dto';
import { LanguageEntity } from './entities/language.entity';

@Injectable()
export class LanguageService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  async getLanguages(): Promise<LanguageDto[]> {
    const languages = await prisma.language.findMany();
    return this.mapper.mapArray(languages as LanguageEntity[], LanguageEntity, LanguageDto);
  }

  async getLanguageById(id: string): Promise<LanguageDto> {
    const language = await prisma.language.findUnique({ where: { id } });
    if (!language) {
      throw new NotFoundException(`Language with ID ${id} not found`);
    }
    return this.mapper.map(language as LanguageEntity, LanguageEntity, LanguageDto);
  }

  async createLanguage(data: CreateLanguageDto): Promise<LanguageDto> {
    try {
      const language = await prisma.language.create({ data });
      return this.mapper.map(language as LanguageEntity, LanguageEntity, LanguageDto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Language already exists');
      }
      throw error;
    }
  }

  async updateLanguage(id: string, data: UpdateLanguageDto): Promise<LanguageDto> {
    try {
      const language = await prisma.language.update({ where: { id }, data });
      return this.mapper.map(language as LanguageEntity, LanguageEntity, LanguageDto);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Language not found');
      }
      if (error.code === 'P2002') {
        throw new ConflictException('Language already exists');
      }
      throw error;
    }
  }

  async deleteLanguage(id: string): Promise<void> {
    try {
      await prisma.language.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Language not found');
      }
      if (error.code === 'P2003') {
        throw new ConflictException('Cannot delete language with dictionaries');
      }
      throw error;
    }
  }
}