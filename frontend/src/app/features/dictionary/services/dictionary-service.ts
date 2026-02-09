import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { wordEntity } from '../models/wordEntity.model';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  constructor(private readonly http: HttpClient) {}

  public getEntries(): Observable<wordEntity[]> {
    return this.http
      .get<wordEntity[]>('/api/dictionary')
      .pipe(catchError(() => of([])));
  }
}
