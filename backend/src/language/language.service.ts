import { Injectable } from '@nestjs/common';
import { prisma } from 'src/prisma';
import { Language } from '@prisma/client';

@Injectable()
export class LanguageService {
  async getLanguages(): Promise<Language[]> {
    return prisma.language.findMany();
  }

  async getLanguageById(id: string): Promise<Language | null> {
    return prisma.language.findUnique({ where: { id } });
  }

  async createLanguage(data: { name: string; code: string }): Promise<Language> {
    return prisma.language.create({ data });
  }

  async updateLanguage(id: string, data: { name?: string; code?: string }): Promise<Language> {
    return prisma.language.update({ where: { id }, data });
  }

  async deleteLanguage(id: string): Promise<Language> {
    return prisma.language.delete({ where: { id } });
  }
}