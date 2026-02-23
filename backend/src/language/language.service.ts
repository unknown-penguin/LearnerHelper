import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { prisma } from 'src/prisma';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { LanguageDto } from './dto/language.dto';

@Injectable()
export class LanguageService {
  private toDto(l: { id: string; name: string; code: string; createdAt: Date; updatedAt: Date }): LanguageDto {
    const dto = new LanguageDto();
    dto.id = l.id;
    dto.name = l.name;
    dto.code = l.code;
    dto.createdAt = l.createdAt;
    dto.updatedAt = l.updatedAt;
    return dto;
  }

  async getLanguages(): Promise<LanguageDto[]> {
    const languages = await prisma.language.findMany();
    return languages.map((l) => this.toDto(l));
  }

  async getLanguageById(id: string): Promise<LanguageDto> {
    const language = await prisma.language.findUnique({ where: { id } });
    if (!language) {
      throw new NotFoundException(`Language with ID ${id} not found`);
    }
    return this.toDto(language);
  }

  async createLanguage(data: CreateLanguageDto): Promise<LanguageDto> {
    try {
      const language = await prisma.language.create({ data });
      return this.toDto(language);
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
      return this.toDto(language);
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