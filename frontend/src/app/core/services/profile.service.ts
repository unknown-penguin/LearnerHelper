import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from '../utils/base-http.service';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends BaseHttpService<Profile> {
  protected endpoint = 'profiles';

  constructor(http: HttpClient) {
    super(http);
  }
}
