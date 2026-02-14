import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WordEntry } from '../models/wordEntity.model';
import { BaseHttpService } from '../../../core/utils/base-http.service';

export interface CreateWordDto {
  word: string;
  definition: string;
  partOfSpeech: string;
  languageLevel: string;
  dictionaryId: string;
}

export interface UpdateWordDto {
  word?: string;
  definition?: string;
  partOfSpeech?: string;
  languageLevel?: string;
}

@Injectable({
  providedIn: 'root',
})
export class WordService extends BaseHttpService<WordEntry> {
  protected endpoint = 'words';

  constructor(http: HttpClient) {
    super(http);
  }

  async getByDictionary(dictionaryId: string): Promise<WordEntry[]> {
    return this.query({ dictionaryId });
  }

  async createWord(data: CreateWordDto): Promise<WordEntry> {
    return this.create(data as Partial<WordEntry>);
  }

  async updateWord(id: string, data: UpdateWordDto): Promise<WordEntry> {
    return this.update(id, data as Partial<WordEntry>);
  }

  async deleteWord(id: string): Promise<void> {
    return this.delete(id);
  }
}
