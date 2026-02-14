import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dictionary } from '../../dictionary/models/dictionary.model';
import { BaseHttpService } from '../../../core/utils/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class QuizStateService extends BaseHttpService<Dictionary> {
  protected endpoint = 'dictionaries/quiz/available';

  public readonly availableDictionaries = this.all;

  constructor(http: HttpClient) {
    super(http);
    this.loadAvailableDictionaries();
  }

  public async loadAvailableDictionaries(): Promise<void> {
    await this.load();
  }
}
