import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Language } from '../models/language.model';
import { BaseHttpService } from '../../../core/utils/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService extends BaseHttpService<Language> {
  protected endpoint = 'languages';

  constructor(http: HttpClient) {
    super(http);
    this.load();
  }
}
