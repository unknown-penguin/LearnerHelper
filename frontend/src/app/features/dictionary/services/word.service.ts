import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WordEntry } from '../models/wordEntity.model';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

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
export class WordService {
  private readonly baseUrl = `${environment.apiUrl}/words`;

  constructor(private readonly http: HttpClient) {}

  getByDictionary(dictionaryId: string): Observable<WordEntry[]> {
    return this.http
      .get<WordEntry[]>(this.baseUrl, { params: { dictionaryId } })
      .pipe(catchError((error) => {
        console.error('Error fetching word entries', error);
        return of([]);
      }));
  }

  create(data: CreateWordDto): Observable<WordEntry> {
    return this.http.post<WordEntry>(this.baseUrl, data);
  }

  update(id: string, data: UpdateWordDto): Observable<WordEntry> {
    return this.http.put<WordEntry>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
