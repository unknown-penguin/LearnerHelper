import { Injectable } from '@nestjs/common';
import { prisma } from 'src/prisma';
import { Dictionary } from '@prisma/client';

@Injectable()
export class DictionaryService {
  async getDictionary(): Promise<Dictionary[]> { 
    return await prisma.dictionary.findMany();
  }
}