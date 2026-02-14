import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Language } from '../models/language.model';
import { environment } from '../../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languages = signal<Language[]>([]);
  public readonly allLanguages = this.languages.asReadonly();

  constructor(private readonly http: HttpClient) {
    this.loadLanguages();
  }

  public async loadLanguages(): Promise<void> {
    try {
      const languages = await firstValueFrom(
        this.http.get<Language[]>(`${environment.apiUrl}/languages`)
      );
      this.languages.set(languages);
    } catch (error) {
      console.error('Error loading languages:', error);
      this.languages.set([]);
    }
  }

  public async createLanguage(data: { name: string; code: string }): Promise<Language> {
    const language = await firstValueFrom(
      this.http.post<Language>(`${environment.apiUrl}/languages`, data)
    );
    await this.loadLanguages();
    return language;
  }

  public async updateLanguage(id: string, data: { name?: string; code?: string }): Promise<Language> {
    const language = await firstValueFrom(
      this.http.put<Language>(`${environment.apiUrl}/languages/${id}`, data)
    );
    await this.loadLanguages();
    return language;
  }

  public async deleteLanguage(id: string): Promise<void> {
    await firstValueFrom(
      this.http.delete(`${environment.apiUrl}/languages/${id}`)
    );
    await this.loadLanguages();
  }
}
