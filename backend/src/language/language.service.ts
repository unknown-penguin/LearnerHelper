import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { prisma } from 'src/prisma';
import { Language } from '@prisma/client';
import { CreateLanguageDto, UpdateLanguageDto } from './language.dto';

@Injectable()
export class LanguageService {
  async getLanguages(): Promise<Language[]> {
    return await prisma.language.findMany();
  }

  async getLanguageById(id: string): Promise<Language | null> {
    const language = await prisma.language.findUnique({ where: { id } });
    if (!language) {
      throw new NotFoundException(`Language with ID ${id} not found`);
    }
    return language;
  }

  async createLanguage(data: CreateLanguageDto): Promise<Language> {
    try {
      return await prisma.language.create({ data });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Language already exists');
      }
      throw error;
    }
  }

  async updateLanguage(id: string, data: UpdateLanguageDto): Promise<Language> {
    try {
      return await prisma.language.update({ where: { id }, data });
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

  async deleteLanguage(id: string): Promise<Language> {
    try {
      return await prisma.language.delete({ where: { id } });
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