import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WordEntry } from '../models/wordEntity.model';
import { BaseHttpService } from '../../../core/utils/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class WordService extends BaseHttpService<WordEntry> {
  protected endpoint = 'words';

  constructor(http: HttpClient) {
    super(http);
  }

  async getByDictionary(dictionaryId: string): Promise<WordEntry[]> {
    return this.request<WordEntry[]>()
      .params({ dictionaryId })
      .get();
  }
}
