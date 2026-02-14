import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { wordEntity } from '../models/wordEntity.model';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  constructor(private readonly http: HttpClient) {}

  public getEntries(dictionaryId: string): Observable<wordEntity[]> {
    console.log('Fetching dictionary entries...', `${environment.apiUrl}/word/GetDictionaryWords?dictionaryId=${dictionaryId}`);
    return this.http
      .get<wordEntity[]>(`${environment.apiUrl}/word/GetDictionaryWords?dictionaryId=${dictionaryId}`)
      .pipe(catchError((error) => { console.log('Error fetching dictionary entries', error); return of([])}));
  }
}
