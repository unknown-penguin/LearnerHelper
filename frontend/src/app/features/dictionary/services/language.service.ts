import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Language } from '../models/language.model';
import { BaseHttpService } from '../../../core/utils/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService extends BaseHttpService<Language> {
  protected endpoint = 'languages';
  public readonly allLanguages = this.all;

  constructor(http: HttpClient) {
    super(http);
    this.loadLanguages();
  }

  async loadLanguages(): Promise<void> {
    return this.load();
  }

  async createLanguage(data: { name: string; code: string }): Promise<Language> {
    return this.create(data);
  }

  async updateLanguage(id: string, data: { name?: string; code?: string }): Promise<Language> {
    return this.update(id, data);
  }

  async deleteLanguage(id: string): Promise<void> {
    return this.delete(id);
  }
}
